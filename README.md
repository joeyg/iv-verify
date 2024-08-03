# About the Project - Income verification
This application is uses:
* NextJS
* React
* USWDS react components
* Deployment to cloud.gov

## Assumptions
Accessibility, unit testing, and translation are being built in from the ground up. We want to make sound decisions that allow this app to scale, but understand that we also want to make a few decisions as possible at this early stage. We are still learning about this problem space, but we are sure that accessibility, testing, and translation are important.

## Getting started
First, install the dependencies:
```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Then disable `nextjs` telemetry by running your choice of:

```bash
npx next telemetry disable
```

Open [http://localhost:3000/](http://localhost:3000/) with your browser to see the result.

## Development

### Document structure
This application uses NextJS's default file structure. You can learn more about this from [NextJS](https://nextjs.org/docs/getting-started/project-structure). 

#### `app`
Next has a style where routing is determined by file structure. You'll find all of the application files inside of the `app` directory.
* `[locale]`: where the pages live
* `api`: looks like api endpoints with some automagic nextjs things
	- `POST /export`
	- `GET /sitemap`
* `components`: reused components in the application
* `i18n`: translation keys

#### `lib`
`features` contains our redux stores, which is our data structure in this local-storage-focused app. You'll notice below that there's a question about Store default values and other data structure thoughts below in our notes and decisions but for now this is where we're keeping our data structures. As things become more complicated we will want to revisit our decisions in this area.

#### `public`
Where any public assets are stored.

## Tests and linting
Testing is a first-class citizen here

```bash
# to run tests
npm run test
# to check coverage
npm run coverage
# to lint
npm run lint
```

## Deploy
1. Go to https://github.com/DSACMS/iv-verify/actions/workflows/deploy.yml
1. Click "Run Workflow" button on the right
1. Click "Run Workflow" in the dialog that appears

### Change sandbox locations
Here is how to migrate from one deployment namespace to another. We'll need to run a manual deployment to set up the namespace before setting up the gh action to reflect the new location. 

1. In the new owner's repo, `npm i && npm run build` if you haven't already
2. Edit the `manifest.yml` to create the name you want. I've been using `verify-ledger-prototype`
2. `cf push [name-in-manifest]`

On successful deployment, you can set up the gh actions deployment
1. `cf create-service cloud-gov-service-account space-deployer [name-in-manifest]`
2. `cf create-service-key [name-in-manifest] [your-key-name]`
3. `cf service-key [name-in-manifest] [your-key-name]`
4. A username and password will be printed in your terminal. Using these, proceed to the next steps:
5. `gh secret set CLOUD_GOV_DEPLOY_USERNAME` and enter this secret when prompted
6. `gh secret set CLOUD_GOV_DEPLOY_PASSWORD` and enter this secret when prompted
7. From here, test out a deployment in the repo to test it out

#### Resources
- [Set secrets for gh actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-an-environment)
- [`space-deployer` docs](https://cloud.gov/docs/services/cloud-gov-service-account/)

## Resources
### Project-specific
`TODO`
* JIRA
* Mocks
* what else what else what else?

### Technical
* [NextJS docs](https://nextjs.org/docs)

## Technical notes and deferred decisions

Moved to [ADR](/adr) directory


## Core Team

An up-to-date list of core team members can be found in [MAINTAINERS.md](MAINTAINERS.md). At this time, the project is still building the core team and defining roles and responsibilities. We are eagerly seeking individuals who would like to join the community and help us define and fill these roles.

## Documentation Index

<!-- TODO: This is a like a 'table of contents" for your documentation. Tier 0/1 projects with simple README.md files without many sections may or may not need this, but it is still extremely helpful to provide "bookmark" or "anchor" links to specific sections of your file to be referenced in tickets, docs, or other communication channels. -->

**{list of .md at top directory and descriptions}**

## Repository Structure

<!-- TODO: Using the "tree -d" command can be a helpful way to generate this information, but, be sure to update it as the project evolves and changes over time. -->

**{list directories and descriptions}**

# Development and Software Delivery Lifecycle

The following guide is for members of the project team who have access to the repository as well as code contributors. The main difference between internal and external contributions is that external contributors will need to fork the project and will not be able to merge their own pull requests. For more information on contribributing, see: [CONTRIBUTING.md](./CONTRIBUTING.md).

## Local Development

<!--- TODO - with example below:
This project is monorepo with several apps. Please see the [api](./api/README.md) and [frontend](./frontend/README.md) READMEs for information on spinning up those projects locally. Also see the project [documentation](./documentation) for more info. -->

## Coding Style and Linters

<!-- TODO - Add the repo's linting and code style guidelines -->

Each application has its own linting and testing guidelines. Lint and code tests are run on each commit, so linters and tests should be run locally before commiting.

## Branching Model

<!--- TODO - with example below:
This project follows [trunk-based development](https://trunkbaseddevelopment.com/), which means:

* Make small changes in [short-lived feature branches](https://trunkbaseddevelopment.com/short-lived-feature-branches/) and merge to `main` frequently.
* Be open to submitting multiple small pull requests for a single ticket (i.e. reference the same ticket across multiple pull requests).
* Treat each change you merge to `main` as immediately deployable to production. Do not merge changes that depend on subsequent changes you plan to make, even if you plan to make those changes shortly.
* Ticket any unfinished or partially finished work.
* Tests should be written for changes introduced, and adhere to the text percentage threshold determined by the project.

This project uses **continuous deployment** using [Github Actions](https://github.com/features/actions) which is configured in the [./github/worfklows](.github/workflows) directory.

Pull-requests are merged to `main` and the changes are immediately deployed to the development environment. Releases are created to push changes to production.
-->

## Contributing

Thank you for considering contributing to an Open Source project of the US Government! For more information about our contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Codeowners

The contents of this repository are managed by **{responsible organization(s)}**. Those responsible for the code and documentation in this repository can be found in [CODEOWNERS.md](CODEOWNERS.md).

## Community

The iv-verify team is taking a community-first and open source approach to the product development of this tool. We believe government software should be made in the open and be built and licensed such that anyone can download the code, run it themselves without paying money to third parties or using proprietary software, and use it as they will.

We know that we can learn from a wide variety of communities, including those who will use or will be impacted by the tool, who are experts in technology, or who have experience with similar technologies deployed in other spaces. We are dedicated to creating forums for continuous conversation and feedback to help shape the design and development of the tool.

We also recognize capacity building as a key part of involving a diverse open source community. We are doing our best to use accessible language, provide technical and process documents, and offer support to community members with a wide variety of backgrounds and skillsets. 

### Community Guidelines

Principles and guidelines for participating in our open source community are can be found in [COMMUNITY_GUIDELINES.md](COMMUNITY_GUIDELINES.md). Please read them before joining or starting a conversation in this repo or one of the channels listed below. All community members and participants are expected to adhere to the community guidelines and code of conduct when participating in community spaces including: code repositories, communication channels and venues, and events. 

## Governance
<!-- TODO: Make a short statement about how the project is governed (formally, or informally) and link to the GOVERNANCE.md file.-->

Information about how the iv-verify community is governed may be found in [GOVERNANCE.md](GOVERNANCE.md).

## Feedback

If you have ideas for how we can improve or add to our capacity building efforts and methods for welcoming people into our community, please let us know at **{contact_email}**. If you would like to comment on the tool itself, please let us know by filing an **issue on our GitHub repository.**

## Glossary

Information about terminology and acronyms used in this documentation may be found in [GLOSSARY.md](GLOSSARY.md).

## Policies

### Open Source Policy

We adhere to the [CMS Open Source
Policy](https://github.com/CMSGov/cms-open-source-policy). If you have any
questions, just [shoot us an email](mailto:opensource@cms.hhs.gov).

### Security and Responsible Disclosure Policy

*Submit a vulnerability:* Unfortunately, we cannot accept secure submissions via
email or via GitHub Issues. Please use our website to submit vulnerabilities at
[https://hhs.responsibledisclosure.com](https://hhs.responsibledisclosure.com).
HHS maintains an acknowledgements page to recognize your efforts on behalf of
the American public, but you are also welcome to submit anonymously.

For more information about our Security, Vulnerability, and Responsible Disclosure Policies, see [SECURITY.md](SECURITY.md).

## Public domain

This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/) as indicated in [LICENSE](LICENSE).

All contributions to this project will be released under the CC0 dedication. By submitting a pull request or issue, you are agreeing to comply with this waiver of copyright interest.
