declare module 'requests' {
  export interface InputError {
    field: string;
    location: string;
    messages: string[];
    types: string[];
  }

  export interface ListResponse<T> {
    count: number;
    currentPage: number;
    data: T[];
    document: string;
    perPage: number;
    totalPages: number;
  }

  export interface Response<T> {
    code: number;
    data?: T;
    errors?: InputError[];
    message?: string;
  }

  export interface WrappedResponse<T> {
    data?: T;
    success: boolean;
    errors?: InputError[];
    message?: string;
  }

  export interface ListParams {
    page?: number;
    perPage?: number;
    search?: string;
  }

  export interface DeleteOrGetParams {
    id: string;
  }

  /* Interests */
  export interface Interest {
    _id: string;
    nom: string;
    rank: string;
  }

  export interface ListInterestsParams {
    page?: number;
    perPage?: number;
    search?: string;
  }
  export type ListInterestResponse = ListResponse<Interest>;

  export interface CreateInterestParams {
    nom: string;
    rank: string;
  }
  export interface GetInterestParams {
    id: number;
  }
  export type DeleteInterestParams = DeleteOrGetParams;
  export type PatchInterestParams = CreateInterestParams & { id: string };

  /* Question */
  export interface Question {
    title: string;
    _id: string;
  }
  export interface ListQuestionsParams {
    page?: number;
    perPage?: number;
    search?: string;
  }
  export type ListQuestionResponse = ListResponse<Question>;
  export interface CreateQuestionParams {
    title: string;
  }
  export interface GetQuestionParams {
    id: number;
  }
  export type DeleteQuestionParams = DeleteOrGetParams;
  export type EditQuestionParams = CreateQuestionParams & { id: string };

  /* Activities */
  export interface Activity {
    _id: string;
    title: string;
    description: string;
    type: string;
    verified: boolean;
    interests: Interest[];
  }

  export interface ListActivitiesParams {
    page?: number;
    perPage?: number;
    search?: string;
    type?: string;
  }

  export type ListActivitiesResponse = ListResponse<Activity>;

  export interface CreateActivityParams {
    title: string;
    description?: string;
    type: string;
    verified: boolean;
    interests: string[];
  }
  export type GetActivityParams = DeleteOrGetParams;
  export type DeleteActivityParams = DeleteOrGetParams;
  export type PatchActivityParams = CreateActivityParams & { id: string };

  /* Themes */
  export interface Theme {
    _id: string;
    title: string;
    description: string;
    type: string;
    verified: boolean;
    createdAt: string;
    activities: Activity[];
    resources: { color: string; backgroundColor: string; icon: string };
    parentId: string;
    required?: string[];
  }
  export interface ListThemesParams {
    page?: number;
    perPage?: number;
    search?: string;
    type?: string;
  }

  export type ListThemesResponse = ListResponse<Theme>;

  export interface CreateThemeParams {
    title: string;
    description: string;
    type: string;
    verified: boolean;
    activities: string[];
    resources: {
      color: string;
      backgroundColor: string;
    };
    icon?: File;
    parentId?: string;
    required?: string[];
  }
  export type GetThemeParams = DeleteOrGetParams;
  export type DeleteThemeParams = DeleteOrGetParams;
  export type PatchThemeParams = CreateThemeParams & { id: string };

  /* users */
  export interface IUser {
    _id: string;
    uniqId: string;
    role: string;
    createdAt: string;
    platform: string;
    email: string;
    profile: {
      pseudo: string;
      firstName: string;
      lastName: string;
      institution: string;
    };
    context: IContext[];
  }

  export interface listUsersParams {
    page?: number;
    perPage?: number;
    search?: string;
  }
  export type ListUsersResponse = ListResponse<IUser>;
  export type GetUserParams = DeleteOrGetParams;
  export type DeleteUserParams = DeleteOrGetParams;
  /* Advisor */
  export interface Iadvisor {
    _id: string;
    email: string;
    profile: {
      pseudo: string;
      firstName: string;
      lastName: string;
      institution: string;
    };
    password: string;
  }

  export interface ListAdvisorsParams {
    page?: number;
    perPage?: number;
    search?: string;
    type?: string;
    role?: string;
  }

  export type ListAdvisorsResponse = ListResponse<Iadvisor>;

  export interface CreateAdvisorParams {
    email: string;
    password: string;
    pseudo: string;
    firstName: string;
    lastName: string;
    institution: string;
  }
  export type GetAdvisorParams = DeleteOrGetParams;
  export type DeleteAdvisorParams = DeleteOrGetParams;
  export interface PatchAdvisorParams {
    id: string;
    password?: string;
    pseudo: string;
    firstName: string;
    lastName: string;
    institution: string;
  }
  /* Competences */
  export interface ICompetence {
    _id: string;
    title: string;
    rank?: string;
    niveau: Iniveau[];
    color: string;
  }
  export interface Iniveau {
    title: string;
    sub_title: string;
    _id?: string;
  }

  export interface CreateComptenceParams {
    title: string;
    rank: string;
    niveau: Iniveau[];
  }

  export interface EditComptenceParams {
    niveau: Iniveau[];
    color: string;
  }

  export type ListCompetencesResponse = ListResponse<ICompetence>;
  export type GetCompetenceParams = DeleteOrGetParams;
  export type DeleteCompetenceParams = DeleteOrGetParams;
  export type patchCompetenceParams = EditComptenceParams & {
    id: string | undefined;
  };

  export interface ListCompetencesParams {
    page?: number;
    perPage?: number;
    search?: string;
  }
  export interface listParcoursParams {
    page?: number;
    perPage?: number;
    search?: string;
  }
  export interface getParcoursParams {
    id: string;
  }
  export interface getJobsParams {
    parcourId: string;
  }
  export interface IParcour {
    _id: string;
    userId: {
      email?: string;
      uniqId: string;
      profile: {
        firstName: string;
        lastName: string;
        pseudo: string;
        email: string;
        institution: string;
      };
      context?: IContext[];
    };
    completed: boolean;
    skills: [];
    globalCopmetences: [];
    globalInterest: [];
    advisorId?: {
      _id: string;
      email: string;
      profile: {
        firstName: string;
        lastName: string;
        institution: string;
      };
      context?: IContext[];
    };
    families: Famille[];
  }

  export interface listLoginParams {
    email: string;
    password: string;
  }

  export type ListParcoursResponse = ListResponse<IParcour>;
  export type getParcoursResponse = IParcour;
  export type DeleteParcourParams = DeleteOrGetParams;

  export interface ISecteur {
    /* _id: string;
    data: any[];
    title: string;
    resources: { color: string; backgroundColor: string; icon: string }; */
    secteur: {
      _id: string;
      title: string;
      description: string;
      type: string;
      verified: boolean;
      activities: string[];
      resources: {
        color: string;
        backgroundColor: string;
        icon: string;
      };
      parentId?: string;
    };
    data: any[];
  }
  export interface ListSecteursParams {
    page?: number;
    perPage?: number;
    search?: string;
    type?: string;
  }
  export type GetSecteurParams = DeleteOrGetParams;
  export type DeleteSecteurParams = DeleteOrGetParams;
  export type PatchSecteurParams = createSecteurParams & { id: string };
  export interface CreateSecteurParams {
    secteurChilds: [];
    title: string;
    resources: {
      color: string;
      backgroundColor: string;
    };
    icon?: File;
  }
  export type ListSecteursResponse = ListResponse<ISecteur>;

  export interface Famille {
    _id: string;
    nom: string;
    interests: Interest[];
    resources: any[];
  }
  export type GetFamilleParams = DeleteOrGetParams;
  export type DeleteFamilleParams = DeleteOrGetParams;
  export type DeletePhotoParams = {
    id: string;
    resource: string;
  };
  export interface CreateFamilleParams {
    nom: string;
    interests: Interest[];
    resources: any[];
  }
  export type PatchFamilleParams = CreateFamilleParams & { id: string };
  export type ListFamillesResponse = ListResponse<Famille>;
  export interface ListFamillesParams {
    page?: number;
    perPage?: number;
    search?: string;
    type?: string;
  }

  export interface Job {
    title: string;
    description: string;
    interests: { _id: string; weight: number; rank: string; nom: string }[];
    competences: { _id: string; weight: number; rank: string; title: string }[];
    formations: any;
    _id: string;
    jobRank: number;
    secteur: { title: string; _id: string }[];
    accessibility: string;
    interested: boolean;
    environments: IEnvironment[];
  }

  export interface CreateJobData {
    title: string;
    description: string;
    interests: { _id: string; weight: string }[];
    competences: { _id: string; weight: string }[];
    formations: any;
    secteur: any;
    accessibility?: string;
    environments: IEnvironment[];
  }

  export interface Rank {
    id: string;
    rank: string;
    pExpInt: number;
  }
  export type ListRanksResponse = ListResponse<Rank>;
  export interface CreateRankParams {
    familiesRank: { pExpInt: number; rank: number }[];
  }
  export type ListRanksParams = {
    page?: number;
    perPage?: number;
    search?: string;
  };

  export interface IContext {
    _id: string;
    title: string;
    description: string;
  }

  export interface IEnvironment {
    _id: string;
    title: string;
  }

  export type ListContextResponse = ListResponse<IContext>;
  export type GetContextParams = DeleteOrGetParams;
  export interface CreateContextParams {
    title: string;
    description: string;
  }
  export type PatchContextparams = CreateContextParams & { id: string };
  export interface ListContextsParams {
    page?: number;
    perPage?: number;
    search?: string;
  }

  export type ListEnvironmentResponse = ListResponse<IEnvironment>;
  export type GetEnvironmentParams = DeleteOrGetParams;
  export interface CreateEnvironmentParams {
    title: string;
  }
  export type PatchEnvironmentparams = CreateEnvironmentParams & { id: string };
  export interface ListEnvironmentsParams {
    page?: number;
    perPage?: number;
    search?: string;
  }
}
