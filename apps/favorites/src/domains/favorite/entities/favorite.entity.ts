import { IFavorite } from '@bookstore-nx/entities';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('favorites')
export class FavoriteEntity implements IFavorite {
  @PrimaryColumn({ type: 'uuid' })
  public userId: string;

  @PrimaryColumn({ type: 'uuid' })
  public entityId: string;

  @Column({
    length: 25,
    type: 'character varying',
  })
  public entityType: string;

  @Column({ length: 25, type: 'character varying' })
  public category: string;
}
