import { prisma } from "@/libs/prismaDB";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    try {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //return NextResponse.json(user);

  // Return the user object without the password for security
  const { password: _, ...userWithoutPassword } = user;

  return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error during signup:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
