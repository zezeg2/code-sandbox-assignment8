import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { CoreOutput } from "../../common/dtos/output.dto";

@InputType()
export class CreateAccountInput extends PickType(PartialType(User), [
  "email",
  "password",
  "role"
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
