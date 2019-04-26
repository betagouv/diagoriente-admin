declare module 'reducers' {
  import { RouterState } from 'connected-react-router';
  import { PersistState } from 'redux-persist';
  import { Map } from 'immutable';
  import {
    Theme,
    Activity,
    Interest,
    IUser,
    ListThemesResponse,
    ICompetence,
    ListParcoursResponse,
    IParcour,
    Iadvisor,
    ListSecteurResponse,
    ISecteur,
    Famille,
    ListFamillesResponse,
    Job,
    ListRanksResponse,
  } from 'requests';

  export interface ImmutableMap<T> extends Map<string, any> {
    get<K extends keyof T>(name: K): T[K];
    merge<O extends Partial<T>>(object: O): this;
  }

  export type Language = 'en' | 'fr' | 'ar';

  export type ApiReducer = {
    error: string;
    fetching: boolean;
  };

  export type ConfigState = ImmutableMap<{
    language: Language;
  }>;

  export type LoginState = ImmutableMap<{
    token: string | null;
    error?: boolean;
    fetching: boolean;
    connected: boolean;
    email: string;
    password: string;
    role: string;
    _id: string;
  }>;

  export type LoginStateAdvisor = ImmutableMap<{
    token: string | null;
    error?: boolean;
    fetching: boolean;
    connected: boolean;
    email: string;
    password: string;
    role: string;
    _id: string;
  }>;

  export type StartUp = ImmutableMap<{
    done: boolean;
  }>;
  export type ThemesResources = ImmutableMap<
    {
      backgroundColor: string;
      color: string;
      icon: string;
    } & ApiReducer
  >;
  export type CreateTheme = ImmutableMap<ApiReducer>;
  export type ListThemes = ImmutableMap<{ themes: ListThemesResponse } & ApiReducer>;
  export type GetTheme = ImmutableMap<{ theme: Theme } & ApiReducer>;
  export type PatchTheme = ImmutableMap<ApiReducer>;
  export type DeleteTheme = ImmutableMap<ApiReducer>;

  export type Themes = ImmutableMap<{
    createTheme: CreateTheme;
    listThemes: ListThemes;
    getTheme: GetTheme;
    patchTheme: PatchTheme;
    deleteTheme: DeleteTheme;
  }>;

  export type CreateActivity = ImmutableMap<ApiReducer>;
  export type ListActivities = ImmutableMap<{ activities: ListActivitiesResponse } & ApiReducer>;
  export type GetActivity = ImmutableMap<{ activity: Activity } & ApiReducer>;
  export type PatchActivity = ImmutableMap<ApiReducer>;
  export type DeleteActivity = ImmutableMap<ApiReducer>;

  export type Activities = ImmutableMap<{
    createActivity: CreateActivity;
    listActivities: ListActivities;
    getActivity: GetActivity;
    patchActivity: PatchActivity;
    deleteActivity: DeleteTheme;
  }>;

  export type CreateInterest = ImmutableMap<ApiReducer>;
  export type ListInterests = ImmutableMap<{ interests: ListInterestResponse } & ApiReducer>;
  export type GetInterest = ImmutableMap<{ interest: Interest } & ApiReducer>;
  export type PatchInterest = ImmutableMap<ApiReducer>;
  export type DeleteInterest = ImmutableMap<ApiReducer>;

  export type Interests = ImmutableMap<{
    createInterest: CreateInterest;
    listInterests: ListInterests;
    getInterest: GetInterest;
    patchInterest: PatchInterest;
    deleteInterest: DeleteInterest;
  }>;

  export type GetUser = ImmutableMap<{
    fetching: boolean;
    error: string;
    User: IUser;
  }>;

  export type listUsers = ImmutableMap<{
    fetching: boolean;
    error: string;
    users: ListUsersResponse;
  }>;
  export type listParcours = ImmutableMap<{
    fetching: boolean;
    error: string;
    parcours: ListParcoursResponse;
  }>;

  export type Parcours = ImmutableMap<{
    listParcours: listParcours;
    GetParcours: getParcours;
    deleteParcour: DeleteParcour;
  }>;
  export type getParcours = ImmutableMap<{ parcours: IParcour } & ApiReducer>;
  export type getJobs = ImmutableMap<{ jobs: Job[] } & ApiReducer>;
  export type DeleteParcour = ImmutableMap<{
    fetching: boolean;
    error: string;
  }>;

  export type DeleteUser = ImmutableMap<{
    fetching: boolean;
    error: string;
  }>;

  export type Users = ImmutableMap<{
    getUser: GetUser;
    listUsers: listUsers;
    deleteUser: DeleteUser;
  }>;

  export type GetCompetence = ImmutableMap<{
    fetching: boolean;
    error: string;
    competence: ICompetence;
  }>;
  export type ListCompetences = ImmutableMap<{ competences: ListCompetencesResponse } & ApiReducer>;
  export type DeleteCompetence = ImmutableMap<ApiReducer>;
  export type PatchCompetence = ImmutableMap<ApiReducer>;
  export type CreateCompetence = ImmutableMap<ApiReducer>;

  export type Competences = ImmutableMap<{
    createCompetence: CreateCompetence;
    getCompetence: GetCompetence;
    listCompetences: ListCompetences;
    deleteCompetence: DeleteCompetence;
    patchCompetence: PatchCompetence;
  }>;

  export type GetAdvisor = ImmutableMap<{
    fetching: boolean;
    error: string;
    advisor: Iadvisor;
  }>;
  export type ListAdvisors = ImmutableMap<{ advisors: ListAdvisorsResponse } & ApiReducer>;
  export type DeleteAdvisor = ImmutableMap<ApiReducer>;
  export type PatchAdvisor = ImmutableMap<ApiReducer>;
  export type CreateAdvisor = ImmutableMap<ApiReducer>;

  export type Advisor = ImmutableMap<{
    createAdvisor: CreateAdvisor;
    getAdvisor: GetAdvisor;
    listAdvisors: ListAdvisors;
    deleteAdvisor: DeleteAdvisor;
    patchAdvisor: PatchAdvisor;
  }>;

  export type GetSecteur = ImmutableMap<{ secteur: ISecteur } & ApiReducer>;
  export type DeleteSecteur = ImmutableMap<ApiReducer>;
  export type CreateSecteur = ImmutableMap<ApiReducer>;
  export type PatchSecteur = ImmutableMap<ApiReducer>;
  export type ListSecteurs = ImmutableMap<
    {
      secteurs: ListSecteurResponse;
    } & ApiReducer
  >;
  export type Secteur = ImmutableMap<{
    createSecteur: CreateSecteur;
    getSecteur: GetSecteur;
    patchSecteur: PatchSecteur;
    deleteSecteur: DeleteSecteur;
    listSecteurs: ListSecteurs;
  }>;

  export type GetFamille = ImmutableMap<{ famille: Famille } & ApiReducer>;
  export type DeleteFamille = ImmutableMap<ApiReducer>;
  export type CreateFamille = ImmutableMap<ApiReducer>;
  export type PatchFamille = ImmutableMap<ApiReducer>;
  export type ListFamilles = ImmutableMap<
    {
      familles: ListFamillesResponse;
    } & ApiReducer
  >;

  export type FamilleInteret = ImmutableMap<{
    createFamille: CreateFamille;
    getFamille: GetFamille;
    patchFamille: PatchFamille;
    deleteFamille: DeleteFamille;
    listFamilles: ListFamilles;
  }>;

  export type CreateRank = ImmutableMap<ApiReducer>;
  export type ListRanks = ImmutableMap<{ ranks: ListRanksResponse } & ApiReducer>;
  

  export type IRanks = ImmutableMap<{
    createRank: CreateRank;
    listRanks : ListRanks;
  }>

  export interface ReduxState {
    config: ConfigState;
    router: RouterState;
    _persist?: PersistState;
    login: LoginState;
    loginAdvisor: LoginStateAdvisor;
    startUp: StartUp;
    themes: Themes;
    activities: Activities;
    interests: Interests;
    users: Users;
    competences: Competences;
    parcours: Parcours;
    advisor: Advisor;
    secteur: Secteur;
    famille: FamilleInteret;
    job: getJobs;
    ranks: IRanks;
  }
}
