import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({name:'MarchPassword', async:false})

export class MarchPassword implements ValidatorConstraintInterface {
    validate(passsword: string, argument?: ValidationArguments): Promise<boolean> | boolean {
        
        if(passsword !== argument.object[argument.constraints[0]]) return false;
        return true
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Password no es igual'
    }
}
