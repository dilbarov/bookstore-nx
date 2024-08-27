import {
  CreateFavoriteDto,
  DeleteFavoriteDto,
  UpdateFavoriteDto,
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
  useUpdateFavoriteMutation,
} from '../../../../graphql/graphql';
import { useCurrentUser } from '../../../../hooks/use-current-user';

type ReturnType = {
  createFavorite: (data: Pick<CreateFavoriteDto, 'entityId' | 'category'>) => void;
  updateFavorite: (data: Pick<UpdateFavoriteDto, 'entityId' | 'category'>) => void;
  deleteFavorite: (data: Pick<DeleteFavoriteDto, 'entityId'>) => void;
};

export const useFavorite = (): ReturnType => {
  const { user } = useCurrentUser();

  const [createFavoriteMutation] = useCreateFavoriteMutation();
  const [deleteFavoriteMutation] = useDeleteFavoriteMutation();
  const [updateFavoriteMutation] = useUpdateFavoriteMutation();

  const createFavorite = async ({ entityId, category }: Pick<CreateFavoriteDto, 'entityId' | 'category'>) => {
    if (!user) {
      return;
    }

    await createFavoriteMutation({
      variables: {
        favorite: {
          entityId,
          entityType: 'book',
          category,
          userId: user.id,
        },
      },
    });
  };

  const deleteFavorite = async ({ entityId }: Pick<DeleteFavoriteDto, 'entityId'>) => {
    if (!user) {
      return;
    }

    await deleteFavoriteMutation({
      variables: {
        favorite: {
          entityId,
          userId: user.id,
        },
      },
    });
  };

  const updateFavorite = async ({ entityId, category }: Pick<UpdateFavoriteDto, 'entityId' | 'category'>) => {
    if (!user) {
      return;
    }

    await updateFavoriteMutation({
      variables: {
        favorite: {
          entityId,
          category,
          userId: user.id,
        },
      },
    });
  };

  return {
    createFavorite,
    deleteFavorite,
    updateFavorite,
  };
};
