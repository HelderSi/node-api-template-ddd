import { FoosRepository } from 'modules/foos/infra/db/someORM/repositories/FoosRepository'
import { IFoosRepository } from 'modules/foos/repositories/IFoosRepository'
import { container, } from 'tsyringe'

container.registerSingleton<IFoosRepository>(
    "FoosRepository",
    FoosRepository
)