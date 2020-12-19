--use-workspaces
Enables integration with Yarn Workspaces (available since yarn@0.27+). The values in the array are the commands in which Lerna will delegate operation to Yarn (currently only bootstrapping). If --use-workspaces is true then packages will be overridden by the value from package.json/workspaces. May also be configured in lerna.json:
```
{
  ...
  "npmClient": "yarn",
  "useWorkspaces": true
}
```
The root-level package.json must also include a workspaces array:
```
{
  "private": true,
  "devDependencies": {
    "lerna": "^2.2.0"
  },
  "workspaces": ["packages/*"]
}
```
This list is broadly similar to lerna's packages config (a list of globs matching directories with a package.json), except it does not support recursive globs ("**", a.k.a. "globstars").