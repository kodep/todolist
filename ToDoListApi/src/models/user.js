const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    }
  })
  User.associate = models => {
    User.hasMany(models.ToDoList);
  };
  User.findByOdj = async obj => {
    let user = await User.findOne({
      where: obj,
      raw: true,
    });
    return user;
  };
  return User;
};

export default user;