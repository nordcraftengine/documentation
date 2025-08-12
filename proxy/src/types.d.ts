import type { Context } from 'hono'

export type GetPageUrl = {
  path?: string
  menuItems: MenuItem[]
}

export type PageData = null | {
  seo: object
  meta: {
    title?: string
    description?: string
  }
  content: any[]
}

export type FetchMenuItems = {
  owner: string
  repository: string
  branch: string
}

export type RepositoryItem = {
  path: string
  type: 'blob' | 'tree'
  label: string
}

export type MenuItem = MenuItemFile | MenuItemFolder

type MenuItemFile = {
  type: 'file'
  name: string
  id: string
  path: string
  localPath: string
  contributorsPath: string
}

type MenuItemFolder = {
  type: 'folder'
  name: string
  id: string
  children: MenuItem[]
}

export type GetFilePath = FetchMenuItems & {
  path: string
}

export type Env = {
  TYPESENSE_SEARCH_TOKEN: string
  TYPESENSE_HOST: string
  CLICKHOUSE_HOST: string
  CLICKHOUSE_USER: string
  CLICKHOUSE_PASSWORD: string
}

export type FetchContent = {
  params: { owner: string; repository: string; branch: string; path?: string }
  ctx: Context<{ Bindings: Env }>
}

export type FetchMenu = {
  params: { owner: string; repository: string; branch: string; path?: string }
  ctx: Context<{ Bindings: Env }>
}

export type PageInKv = {
  updatedAt: Date
  data: PageData
}

export type MenuInKv = {
  updatedAt: Date
  items: MenuItem[]
}

export type DataInKv = null | {
  menu: MenuInKv
  pages: {
    [key: string]: PageInKv
  }
}

export type FetchPageData = {
  path: string
  title: string
}

export type FetchContributors = {
  owner: string
  repository: string
  path?: string
}

export type FetchFileList = {
  owner: string
  repository: string
}

export type ProcessedFileFromGithub = {
  path: string
  breadcrumbs: string[]
  filePath: string
  title: string
}

export type Search = {
  params: {
    searchTerm: string
  }
  ctx: Context<{ Bindings: Env }>
}

export type PreferLocalData = {
  owner: string
  repository: string
  branch: string
}
