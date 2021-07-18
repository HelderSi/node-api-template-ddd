#!/bin/node
import createFolder from "./utils/createFolder";
import writeFile from "./utils/writeFile";
import capitalize from "./utils/capitalize";
import toCamelCase from "./utils/toCamelCase";

export default {
    execute: (args: string[]) => {
        if (!args[0]) {
            console.log(`Please use "add repository [moduleName]/[RepositoryName]" syntax.`);
            process.exit(1);
        }

        let [moduleName, repositoryName] = args[0].split('/')

        if (!moduleName) {
            console.log(`Module name not informed. Please use "add repository [moduleName]/[RepositoryName]" syntax.`);
            process.exit(1);
        }
        if (!repositoryName) {
            console.log(`Repository name not informed. Please use [moduleName]/[UseCaseName] syntax.`);
            process.exit(1);
        }

        repositoryName = capitalize(repositoryName)
        const repositoryNameCamelCase = toCamelCase(repositoryName)

        createFolder(`src/modules/${moduleName}/dtos`);
        writeFile(`src/modules/${moduleName}/dtos/ICreate${repositoryName}DTO.ts`,
            `// DTO => Data transfer object
export interface ICreate${repositoryName}DTO {
}
`)

        const repositoriesPath = `src/modules/${moduleName}/repositories`
        createFolder(repositoriesPath);
        writeFile(`${repositoriesPath}/I${repositoryName}Repository.ts`,
            `import {
  ICreate${repositoryName}DTO,
} from "../dtos/ICreate${repositoryName}DTO";

interface I${repositoryName}Repository {
  create({  }: ICreate${repositoryName}DTO): Promise<void>;
}

export { I${repositoryName}Repository };

`)
        createFolder(`${repositoriesPath}/inMemory`);
        writeFile(`${repositoriesPath}/inMemory/${repositoryName}InMemory.ts`,
            `import { ${repositoryName} } from "../../models/I${repositoryName}";
import {
  ICreate${repositoryName}DTO,
} from "../../dtos/ICreate${repositoryName}DTO";
import {
  I${repositoryName}Repository
} from "../I${repositoryName}Repository";

class ${repositoryName}RepositoryInMemory implements I${repositoryName}Repository {
  private ${repositoryNameCamelCase}: ${repositoryName}[];

  private static INSTANCE: ${repositoryName}RepositoryInMemory;

  constructor() {
    this.${repositoryNameCamelCase} = [];
  }

  /**
   * Singleton Pattern
   */
  public static getInstance(): ${repositoryName}RepositoryInMemory {
    if (!${repositoryName}RepositoryInMemory.INSTANCE) {
        ${repositoryName}RepositoryInMemory.INSTANCE = new ${repositoryName}RepositoryInMemory();
    }

    return ${repositoryName}RepositoryInMemory.INSTANCE;
  }

  async create({ }: ICreate${repositoryName}DTO): Promise<void> {
    const ${repositoryNameCamelCase} = new ${repositoryName}();

    Object.assign(${repositoryNameCamelCase}, {
      created: new Date(),
    });

    this.${repositoryNameCamelCase}.push(${repositoryNameCamelCase});
  }
}

export { ${repositoryName}RepositoryInMemory };
`)






    }
}
