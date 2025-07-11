import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MemberController {
  async getMembers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, limit = 20, search, gotra, locality } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      const where: any = {
        isPublic: true,
        user: { status: 'ACTIVE' }
      };

      // Add search filters
      if (search) {
        where.OR = [
          { firstName: { contains: search as string, mode: 'insensitive' } },
          { lastName: { contains: search as string, mode: 'insensitive' } },
          { gotra: { contains: search as string, mode: 'insensitive' } },
          { locality: { contains: search as string, mode: 'insensitive' } }
        ];
      }

      if (gotra) {
        where.gotra = { contains: gotra as string, mode: 'insensitive' };
      }

      if (locality) {
        where.locality = { contains: locality as string, mode: 'insensitive' };
      }

      const [members, totalCount] = await Promise.all([
        prisma.member.findMany({
          where,
          include: {
            user: {
              select: { email: true, isVerified: true }
            }
          },
          orderBy: { firstName: 'asc' },
          skip,
          take
        }),
        prisma.member.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          members,
          pagination: {
            currentPage: Number(page),
            totalPages: Math.ceil(totalCount / take),
            totalCount,
            limit: take
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getMemberById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const member = await prisma.member.findUnique({
        where: { id },
        include: {
          user: {
            select: { email: true, isVerified: true, role: true }
          },
          family: true,
          businesses: {
            where: { isActive: true }
          }
        }
      });

      if (!member) {
        res.status(404).json({
          success: false,
          message: 'Member not found'
        });
        return;
      }

      // Check if profile is public or user has permission
      if (!member.isPublic && req.user?.userId !== member.userId) {
        res.status(403).json({
          success: false,
          message: 'Profile is private'
        });
        return;
      }

      res.json({
        success: true,
        data: { member }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMember(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Check if user owns this member profile
      const existingMember = await prisma.member.findUnique({
        where: { id }
      });

      if (!existingMember) {
        res.status(404).json({
          success: false,
          message: 'Member not found'
        });
        return;
      }

      if (existingMember.userId !== req.user!.userId) {
        res.status(403).json({
          success: false,
          message: 'Not authorized to update this profile'
        });
        return;
      }

      // Remove sensitive fields that shouldn't be updated directly
      delete updateData.id;
      delete updateData.userId;
      delete updateData.membershipNo;
      delete updateData.createdAt;
      delete updateData.updatedAt;

      const updatedMember = await prisma.member.update({
        where: { id },
        data: updateData,
        include: {
          user: {
            select: { email: true, isVerified: true }
          }
        }
      });

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: { member: updatedMember }
      });
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const [
        totalMembers,
        totalGotras,
        totalLocalities,
        recentMembers
      ] = await Promise.all([
        prisma.member.count({
          where: { user: { status: 'ACTIVE' } }
        }),
        prisma.member.groupBy({
          by: ['gotra'],
          where: { user: { status: 'ACTIVE' } }
        }),
        prisma.member.groupBy({
          by: ['locality'],
          where: { user: { status: 'ACTIVE' } }
        }),
        prisma.member.count({
          where: {
            user: { status: 'ACTIVE' },
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
          }
        })
      ]);

      res.json({
        success: true,
        data: {
          totalMembers,
          totalGotras: totalGotras.length,
          totalLocalities: totalLocalities.length,
          recentMembers
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export const memberController = new MemberController();
