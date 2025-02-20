import { type Heritage, type InsertHeritage } from "@shared/schema";

export interface IStorage {
  getHeritage(): Promise<Heritage | undefined>;
  updateHeritage(heritage: InsertHeritage): Promise<Heritage>;
}

export class MemStorage implements IStorage {
  private heritage?: Heritage;
  private currentId: number = 1;

  async getHeritage(): Promise<Heritage | undefined> {
    return this.heritage;
  }

  async updateHeritage(insertHeritage: InsertHeritage): Promise<Heritage> {
    this.heritage = { ...insertHeritage, id: this.currentId };
    return this.heritage;
  }
}

export const storage = new MemStorage();