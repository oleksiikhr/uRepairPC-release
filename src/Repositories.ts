import Repository from './Repository';

export default class Repositories {
  public repositories: Repository[];

  constructor (...repositories: Repository[]) {
    this.repositories = repositories;
  }

  public addRepository (repository: Repository) {
    this.repositories.push(repository);
  }

  public execRun () {
    this.repositories.forEach((rep) => {
      rep.github.clone();
      rep.run();
    });
  }
}
