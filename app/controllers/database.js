import { ipcMain } from 'electron';
import mssql from 'mssql';
import * as R from 'ramda';

ipcMain.on('connect', async (e, { ip, port, username, passwd, database }) => {
  const config = {
    port,
    database,
    server: ip,
    user: username,
    password: passwd,
  };

  await mssql.close();
  const pool = await mssql.connect(config);
  const result = await mssql.query`
  EXEC sp_databases
  `
  const tables = R.compose(
    R.map(R.prop('DATABASE_NAME')),
    R.prop('recordset')
  )(result);

  e.sender.send('connected', tables);
});
