// src/types/index.ts

export enum Role {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    ORGANIZER = "ORGANIZER",
    PARTICIPANT = "PARTICIPANT",
}


export type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
};