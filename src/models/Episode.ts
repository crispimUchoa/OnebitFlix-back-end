import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database"
import { WatchTimeInstance } from "./WatchTime"

export interface Episode {
    id: number
    name: string
    synopsis: string
    order: number
    videoUrl: string
    secondsLong: number
    courseId: number
}

export interface EpisodeCreationAttributes extends Optional<Episode, 'id' | 'videoUrl' | 'secondsLong'>{}

export interface EpisodeInstance extends Model<Episode, EpisodeCreationAttributes>, Episode{
    watchTime?: WatchTimeInstance
}

export const Episode = sequelize.define<EpisodeInstance, Episode>('Episode', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    videoUrl: {
        type: DataTypes.STRING
    },
    secondsLong: {
        type: DataTypes.INTEGER
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'courses', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }
})