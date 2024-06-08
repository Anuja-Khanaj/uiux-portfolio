// projects/shared/src/lib/models/post.model.ts
export interface Post {
    title: string;
    permalink: string;
    category: {
      categoryId: any;
      category: string;
    };
    postImgPath: string;
    excerpt: string;
    content: string;
    isFeatured: boolean;
    views: number;
    status: string;
    createdAt: Date;
  }
  