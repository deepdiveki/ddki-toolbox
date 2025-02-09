// import prisma from '@/lib/prisma'; // Import your Prisma instance
//
// async function main() {
//   // Hash the user's password
//
//   // Insert a new user into the database
//   const newUser = await prisma.user.create({
//     data: {
//       name: 'Test', // Replace with desired name
//       email: 'test@test.com', // Replace with desired email
//       emailVerified: null, // Email not verified yet
//       password: '1234', // Save the hashed password
//       passwordResetToken: null, // No reset token
//       passwordResetTokenExp: null, // No expiration for reset token
//     },
//   });
//
//   console.log('User created:', newUser);
// }
//
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });