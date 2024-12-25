import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    if (this.isNumeric(value)) {
      return parseFloat(value);
    }
    throw new BadRequestException(`"${value}" не является числом`)
  }

  isNumeric(value: any): boolean {
    return  !isNaN(value - parseFloat(value));
  }
}
