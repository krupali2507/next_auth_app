import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function hashToken(userId) {
  return await bcrypt.hash(userId, 10);
}
