db.createUser({
  user: 'hero',
  pwd: 'JL9APQUdm9aLcqSMHo97az4lI',
  roles: [
    {
      role: 'readWrite',
      db: 'entities_db',
    },
  ],
});
