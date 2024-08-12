import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function compare(password: string, userPassword: string) {
  try {
    return bcrypt.compare(password, userPassword);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function hashToken(userId: string) {
  try {
    return await bcrypt.hash(userId, 10);
  } catch (error: any) {
    throw new Error(error);
  }
}
