import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Super Admin
  const hashedPassword = await bcrypt.hash('Admin@123', 12)
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@agarwalsabha.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      isVerified: true,
    },
  })

  const adminMember = await prisma.member.create({
    data: {
      userId: adminUser.id,
      membershipNo: 'AGR202400001',
      firstName: 'System',
      lastName: 'Administrator',
      fatherName: 'System',
      gotra: 'Admin',
      gender: 'MALE',
      locality: 'System',
      address: {},
    },
  })

  // Create sample members
  const sampleMembers = [
    {
      email: 'rajesh@example.com',
      firstName: 'Rajesh',
      lastName: 'Agarwal',
      gotra: 'Mittal',
      locality: 'Delhi'
    },
    {
      email: 'priya@example.com',
      firstName: 'Priya',
      lastName: 'Sharma',
      gotra: 'Bansal',
      locality: 'Mumbai'
    },
    {
      email: 'amit@example.com',
      firstName: 'Amit',
      lastName: 'Gupta',
      gotra: 'Goyal',
      locality: 'Bangalore'
    }
  ];

  for (const memberData of sampleMembers) {
    const user = await prisma.user.create({
      data: {
        email: memberData.email,
        password: hashedPassword,
        role: 'MEMBER',
        status: 'ACTIVE',
        isVerified: true,
      },
    });

    await prisma.member.create({
      data: {
        userId: user.id,
        membershipNo: `AGR${Date.now() + Math.random()}`,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        fatherName: 'Sample Father',
        gotra: memberData.gotra,
        gender: 'MALE',
        locality: memberData.locality,
        address: {},
      },
    });
  }

  // Create sample events
  await prisma.event.create({
    data: {
      title: 'Maharaja Agrasen Jayanti Celebration',
      description: 'Annual celebration of Maharaja Agrasen birth anniversary with cultural programs, community feast, and traditional ceremonies.',
      shortDescription: 'Annual Maharaja Agrasen Jayanti celebration',
      category: 'CULTURAL',
      type: 'PUBLIC',
      startDate: new Date('2024-09-15'),
      startTime: '18:00',
      endTime: '22:00',
      venue: 'Community Hall',
      maxCapacity: 500,
      isRegistrationRequired: true,
      registrationFee: 0,
      images: [],
      documents: [],
      createdBy: adminUser.id,
    },
  })

  await prisma.event.create({
    data: {
      title: 'Diwali Celebration 2024',
      description: 'Grand Diwali celebration with lights, sweets, cultural performances, and community bonding.',
      shortDescription: 'Grand Diwali celebration',
      category: 'FESTIVAL',
      type: 'PUBLIC',
      startDate: new Date('2024-10-28'),
      startTime: '19:00',
      endTime: '23:00',
      venue: 'Grand Ballroom',
      maxCapacity: 800,
      isRegistrationRequired: true,
      registrationFee: 500,
      images: [],
      documents: [],
      createdBy: adminUser.id,
    },
  })

  // Create sample news
  await prisma.news.create({
    data: {
      title: 'New Community Hall Inauguration',
      slug: 'new-community-hall-inauguration',
      content: 'We are excited to announce the inauguration of our new state-of-the-art community hall...',
      excerpt: 'New community hall with modern facilities inaugurated',
      category: 'ANNOUNCEMENT',
      isPublished: true,
      publishedAt: new Date(),
      tags: ['community', 'infrastructure'],
      views: 0,
      createdBy: adminUser.id,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('📧 Admin Login: admin@agarwalsabha.com')
  console.log('🔑 Admin Password: Admin@123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
