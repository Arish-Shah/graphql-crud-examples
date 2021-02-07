import LaunchAPI from "./datasources/launch";
import UserAPI from "./datasources/user";

interface Context {
  dataSources: {
    launchAPI: LaunchAPI;
    UserAPI: UserAPI;
  };
}

export default {
  Query: {
    launches: (_: any, __: any, context: Context) => {
      return context.dataSources.launchAPI.getAllLaunches();
    },
    launch: (_: any, { id }: { id: number }, context: Context) => {
      return context.dataSources.launchAPI.getLaunchById({ launchId: id });
    },
    me: (_: any, __: any, context: Context) => {
      return context.dataSources.UserAPI.findOrCreateUser();
    }
  }
};
