# primeiro-projeto-node-ts-gostack-11

### criar migrations:

- Tem um script no package para auxiliar nisso, uma vez que estamos usando ts.

Terminal: `yarn typeorm migration:create -n CreateAppointments`

- Execugtar migration: `yarn typeorm migration:run`
- Rollback desfazer : `yarn typeorm migration:revert`

Ver quais migrations já foram executadas:

`yarn typeorm migration:show`
