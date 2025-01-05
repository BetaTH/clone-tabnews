import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

// eslint-disable-next-line no-unused-vars
export async function up(pgm: MigrationBuilder): Promise<void> {}


// eslint-disable-next-line no-unused-vars
export async function down(pgm: MigrationBuilder): Promise<void> {}