// @ts-ignore
/* eslint-disable */

declare namespace API {
  type TokenParams = {
    client_id?: string;
    client_secret?: string;
    grant_type: 'password' | 'refresh_token' | 'client_credentials';
    username?: string;
    password?: string;
    refresh_token?: string;
  };

  type TokenResult = {
    accessToken?: string;
    access_permissions?: string[];
    access_token?: string;
    user?: {
      email?: string;
      fullName?: string;
      id?: string;
      isVerified?: boolean;
    }
  }

  type LocationParams = {
    id?: string
    _id?: string
    name?: string
  }

  type LocationItem = {
    name: string
    _id: string
  }

  type LocationList = {
    data?: LocationItem[];
    total?: number;
    success?: boolean;
  };

  type CategoryParams = {
    id?: string
    _id?: string
    name?: string
  }

  type CategoryItem = {
    name: string
    _id: string
  }

  type CategoryList = {
    data?: CategoryItem[];
    total?: number;
    success?: boolean;
  };

  type WarehouseParams = {
    id?: string
    _id?: string
    name?: string
    locationId?: string
    address?: string
    warehouseArea?: string;
    sqmInventory?: string;
    operationalTimes?: string[];
    fileUrls?: string[];
  }

  type WarehouseItem = {
    name: string
    address: string
    location: {
      name: string;
      id: string;
      _id: string;
    }
    warehouseArea?: string;
    sqmInventory?: string;
    operationalTimes?: string[];
    fileUrls?: string[];
    _id: string
  }

  type WarehouseList = {
    data?: WarehouseItem[];
    total?: number;
    success?: boolean;
  };

  type NewsParams = {
    id?: string
    _id?: string
    title?: string
    caption?: string
    description?: string
    route?: string;
    authorName?: string;
    articleCategoryId?: string;
    fileUrls?: string[];
  }

  type NewsItem = {
    id?: string
    _id?: string
    title?: string
    caption?: string
    description?: string
    route?: string;
    authorName?: string;
    articleCategory?: {
      name: string;
      id: string;
      _id: string;
    };
    fileUrls?: string[];
  }

  type NewsList = {
    data?: WarehouseItem[];
    total?: number;
    success?: boolean;
  };
}
