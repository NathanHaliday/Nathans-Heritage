import { type Heritage, type InsertHeritage, defaultHeritage } from "@shared/schema";

export interface IStorage {
  getHeritage(): Promise<Heritage>;
  updateHeritage(heritage: InsertHeritage): Promise<Heritage>;
}

export class MemStorage implements IStorage {
  private heritage: Heritage;
  private currentId: number = 1;

  constructor() {
    this.heritage = { ...defaultHeritage, id: this.currentId };
  }

  async getHeritage(): Promise<Heritage> {
    return this.heritage;
  }

  async updateHeritage(insertHeritage: InsertHeritage): Promise<Heritage> {
    this.heritage = { ...insertHeritage, id: this.currentId };
    return this.heritage;
  }
}

export const storage = new MemStorage();