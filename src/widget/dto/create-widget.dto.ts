import { IsString, IsObject } from 'class-validator';

type InputJsonValue = Record<string, any>;

export class CreateWidgetDto {
  @IsString()
  name!: string;

  @IsObject()
  config!: InputJsonValue; // Changed to use @IsObject()
}

// Example widget for demonstration purposes
const exampleWidget = {
  name: 'Test Widget',
  config: {
    color: 'blue',
    width: 100,
  }
};
console.log(exampleWidget); // Using the variable to avoid unused error
