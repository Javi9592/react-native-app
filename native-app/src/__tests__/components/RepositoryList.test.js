import React from 'react';
import { render } from '@testing-library/react-native';
import RepositoryList from '../../components/Repositories/RepositoryList.jsx';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const tree = render(
        <RepositoryList repositories={repositories.edges.map(edges=> edges.node)} />,
      );
      expect(tree.getAllByTestId('repositoryName')).toHaveLength(2);
      expect(tree.getAllByTestId('repositoryName')[0]).toHaveTextContent(
        repositories.edges[0].node.fullName,
      );
      expect(tree.getAllByTestId('repositoryName')[1]).toHaveTextContent(
        repositories.edges[1].node.fullName,
      );

      expect(tree.getAllByTestId('repositoryDescription')).toHaveLength(2);
      expect(tree.getAllByTestId('repositoryDescription')[0]).toHaveTextContent(
        repositories.edges[0].node.description,
      );
      expect(tree.getAllByTestId('repositoryDescription')[1]).toHaveTextContent(
        repositories.edges[1].node.description,
      );

      expect(tree.getAllByTestId('repositoryLanguage')).toHaveLength(2);
      expect(tree.getAllByTestId('repositoryLanguage')[0]).toHaveTextContent(
        repositories.edges[0].node.language,
      );
      expect(tree.getAllByTestId('repositoryLanguage')[1]).toHaveTextContent(
        repositories.edges[1].node.language,
      );

      expect(tree.getAllByTestId('repositoryCount')).toHaveLength(8);
      expect(tree.getAllByTestId('repositoryCount')[0]).toHaveTextContent('21.9k');
      expect(tree.getAllByTestId('repositoryCount')[1]).toHaveTextContent('1.6k');
      expect(tree.getAllByTestId('repositoryCount')[2]).toHaveTextContent(
        repositories.edges[0].node.reviewCount,
      );
      expect(tree.getAllByTestId('repositoryCount')[3]).toHaveTextContent(
        repositories.edges[0].node.ratingAverage,
      );
      expect(tree.getAllByTestId('repositoryCount')[4]).toHaveTextContent('1.8k');
      expect(tree.getAllByTestId('repositoryCount')[5]).toHaveTextContent(
        repositories.edges[1].node.forksCount,
      );
      expect(tree.getAllByTestId('repositoryCount')[6]).toHaveTextContent(
        repositories.edges[1].node.reviewCount,
      );
      expect(tree.getAllByTestId('repositoryCount')[7]).toHaveTextContent(
        repositories.edges[1].node.ratingAverage,
      );
    });
  });
});
