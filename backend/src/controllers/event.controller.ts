import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class EventController {
  async getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, limit = 20, category, upcoming } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const take = Number(limit);

      const where: any = {
        isActive: true
      };

      if (category) {
        where.category = category;
      }

      if (upcoming === 'true') {
        where.startDate = {
          gte: new Date()
        };
      }

      const [events, totalCount] = await Promise.all([
        prisma.event.findMany({
          where,
          orderBy: { startDate: 'asc' },
          skip,
          take
        }),
        prisma.event.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          events,
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

  async getEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const event = await prisma.event.findUnique({
        where: { id },
        include: {
          registrations: {
            include: {
              member: {
                select: {
                  firstName: true,
                  lastName: true
                }
              }
            }
          },
          gallery: true
        }
      });

      if (!event) {
        res.status(404).json({
          success: false,
          message: 'Event not found'
        });
        return;
      }

      res.json({
        success: true,
        data: { event }
      });
    } catch (error) {
      next(error);
    }
  }

  async registerForEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { guestCount = 0, notes } = req.body;
      const userId = req.user!.userId;

      // Get member info
      const member = await prisma.member.findUnique({
        where: { userId }
      });

      if (!member) {
        res.status(404).json({
          success: false,
          message: 'Member profile not found'
        });
        return;
      }

      // Check if event exists and is active
      const event = await prisma.event.findUnique({
        where: { id }
      });

      if (!event || !event.isActive) {
        res.status(404).json({
          success: false,
          message: 'Event not found or inactive'
        });
        return;
      }

      // Check if registration is required and still open
      if (event.isRegistrationRequired && event.registrationDeadline && new Date() > event.registrationDeadline) {
        res.status(400).json({
          success: false,
          message: 'Registration deadline has passed'
        });
        return;
      }

      // Check if already registered
      const existingRegistration = await prisma.eventRegistration.findUnique({
        where: {
          eventId_memberId: {
            eventId: id,
            memberId: member.id
          }
        }
      });

      if (existingRegistration) {
        res.status(409).json({
          success: false,
          message: 'Already registered for this event'
        });
        return;
      }

      // Check capacity
      if (event.maxCapacity) {
        const currentRegistrations = await prisma.eventRegistration.count({
          where: { eventId: id }
        });

        if (currentRegistrations >= event.maxCapacity) {
          res.status(400).json({
            success: false,
            message: 'Event is full'
          });
          return;
        }
      }

      // Create registration
      const registration = await prisma.eventRegistration.create({
        data: {
          eventId: id,
          memberId: member.id,
          guestCount,
          notes,
          status: 'REGISTERED'
        },
        include: {
          event: {
            select: {
              title: true,
              startDate: true,
              venue: true
            }
          }
        }
      });

      res.status(201).json({
        success: true,
        message: 'Successfully registered for event',
        data: { registration }
      });
    } catch (error) {
      next(error);
    }
  }
}

export const eventController = new EventController();
