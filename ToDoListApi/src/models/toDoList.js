const toDoList = (sequelize, DataTypes) => {
  const ToDoList = sequelize.define('todolist', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    isClosed: {
      type: DataTypes.BOOLEAN,
    },
    text: {
      type: DataTypes.STRING
    },
    closeDate: {
      type: DataTypes.DATE
    },
    priority: {
      type: DataTypes.INTEGER,
    }
  });
  ToDoList.associate = models => {
    ToDoList.belongsTo(models.User);
  };
  ToDoList.deleteById = async num => {
    await ToDoList.destroy({
      where: { id: num },
    });
  };
  ToDoList.updateById = async (obj, num) => {
    await ToDoList.update(obj, {
      where: { id: num },
    });
  };
  ToDoList.findByOdj = async obj => {
    let toDoList = await ToDoList.findOne({
      where: obj,
      raw:true,
    },
    );
    return toDoList;
  };
  ToDoList.findAllByOdj = async obj => {
    let toDoList = await ToDoList.findAll({
      where: obj,
      raw:true,
      order: [
        ['createdAt', 'ASC'],
      ]
    },
    );
    return toDoList;
  };
  ToDoList.findAllByPriority = async obj => {
    let toDoList = await ToDoList.findAll({
      where: obj,
      raw:true,
      order: [
        ['priority', 'DESC'],
        ['createdAt', 'ASC'],
      ]
    },
    );
    return toDoList;
  };
  ToDoList.findAllByDate = async obj => {
    let toDoList = await ToDoList.findAll({
      where: obj,
      raw:true,
      order: [
        ['closeDate', 'ASC'],
        ['createdAt', 'ASC'],
      ]
    },
    );
    return toDoList;
  };
  ToDoList.findAllByParams = async (obj, orderBy, orderGo) => {
    let toDoList = await ToDoList.findAll({
      where: obj,
      raw:true,
      order: [
        [orderBy, orderGo],
        ['createdAt', 'ASC'],
      ]
    },
    );
    return toDoList;
  };
  ToDoList.deleteItem = async (obj) => {
    let toDoList = await ToDoList.destroy({
      where: obj,
    },
    );
  };
  return ToDoList;
};

export default toDoList;