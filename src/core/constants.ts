import { PasswordValidationRequirement } from 'class-validator-password-check/lib';

export const SALT_ROUNDS = 10;
export const JWT_SECRET = 'p5-eZp8+`y?TC596';
export const PASSWORD_RESET_REQUIREMENT: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};
