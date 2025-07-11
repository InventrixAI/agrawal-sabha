import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, firstName, lastName, gotra } = req.body;

      // Validate required fields
      if (!email || !password || !firstName || !lastName || !gotra) {
        res.status(400).json({
          success: false,
          message: 'All required fields must be provided'
        });
        return;
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        res.status(409).json({
          success: false,
          message: 'Email already registered'
        });
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Generate membership number
      const membershipNo = `AGR${Date.now()}`;

      // Create user and member in transaction
      const result = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email,
            password: hashedPassword,
            role: 'MEMBER',
            status: 'ACTIVE',
            isVerified: true
          }
        });

        const member = await tx.member.create({
          data: {
            userId: user.id,
            membershipNo,
            firstName,
            lastName,
            fatherName: '',
            gotra,
            gender: 'MALE',
            locality: '',
            address: {}
          }
        });

        return { user, member };
      });

      // Generate token
      const token = jwt.sign(
        { userId: result.user.id, email: result.user.email, role: result.user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: {
          user: {
            id: result.user.id,
            email: result.user.email,
            role: result.user.role
          },
          member: result.member,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
        return;
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
        include: { member: true }
      });

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
        return;
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
        return;
      }

      // Check if user is active
      if (user.status !== 'ACTIVE') {
        res.status(401).json({
          success: false,
          message: 'Account is not active'
        });
        return;
      }

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() }
      });

      // Generate token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role
          },
          member: user.member,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    // In a stateless JWT system, logout is handled client-side
    res.json({
      success: true,
      message: 'Logout successful'
    });
  }

  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.userId },
        include: { member: true },
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
          isVerified: true,
          member: true
        }
      });

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      res.json({
        success: true,
        data: { user }
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
