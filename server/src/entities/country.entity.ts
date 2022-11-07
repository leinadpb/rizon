import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

export type CountryDto = {
    name: string;
    code: string;
}

@Entity('tblcountry')
export default class CountryEntity extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ name: 'code', unique: true })
    code: string;

    getDto(): CountryDto {
        return {
            name: this.name,
            code: this.code,
        }
    }
}