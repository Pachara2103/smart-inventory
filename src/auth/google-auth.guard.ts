// เพิ่ม auth/google-auth.guard.ts เพื่อให้เรียกใช้งานใน Controller ได้
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}