const Sequelize = require('sequelize');

module.exports = class Time extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			machine: {
				type: Sequelize.STRING(10),
				allowNull: false,
			},
			
			day: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			
			email: {
				type: Sequelize.STRING(40),
				allowNull: false,
				
			},
			
			starttime: {
				type: Sequelize.INTEGER(10),
				allowNull: false,
			},
			
			endtime: {
				type: Sequelize.INTEGER(10),
				allowNull: false,
			},
		},{
			sequelize,
			timestamps: true,
			underscored: false,
			modelName: 'Time',
			tableName: 'times',
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		});
	}
	static associate(db){
		db.Time.belongsTo(db.User)}
}
