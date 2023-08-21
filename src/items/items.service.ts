import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Model } from 'mongoose';
import { Item } from './schema/items.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto) {
    const newItem = await this.itemModel.create(createItemDto);
    console.log(newItem);
    return newItem;
  }

  async findAll() {
    const items = await this.itemModel.find();
    return items;
  }

  async findOne(id: string) {
    const item = await this.itemModel.findById(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async update(id: string, updates: UpdateItemDto) {
    const updatedItem = await this.itemModel.findByIdAndUpdate(
      { _id: id },
      updates,
      { returnOriginal: false },
    );
    if (!updatedItem) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return updatedItem;
  }

  async remove(id: string) {
    const deletedItem = await this.itemModel.findByIdAndDelete({ _id: id });
    if (!deletedItem) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return null;
  }
}
