import store from '@/store';

import { 
  VuexModule, 
  Module, 
  getModule, 
  Mutation, 
  Action 
} from 'vuex-module-decorators';

interface UserInfo {
  name: string
}

@Module({ namespaced: true, name: 'user', dynamic: true, store })
class User extends VuexModule {
  // user info
  private userInfoState: UserInfo | null = {
    name: 'Wlecome to Your vue3 webpack5 Typescript App'
  };

  get getUserInfoState(): UserInfo | null {
    return this.userInfoState;
  }

  @Mutation
  resetState(): void {
    this.userInfoState = null;
  }

  @Mutation
  commitUserInfoState(info: UserInfo): void {
    this.userInfoState = info;
  }

  /**
   * @description: login
   */
  @Action
  async login(params: any, goHome = true): Promise<null> {
    try {
      return null
    } catch (error) {
      return null;
    }
  }

  /**
   * @description: login out
   */
  @Action
  async loginOut(goLogin = false) {
    
  }

  
}
export { User };

export const userStore = getModule<User>(User);
