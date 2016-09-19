'use strict';

const minimist = require('minimist');

const parse = (args) => {
  if (!args || args.length === 0) {
    throw new Error('No src folder or pattern specified');
  }
  const parsed = minimist(args);
  const writeShared = parsed.writeShared || parsed.w;

  let sources = parsed._;
  let shared = parsed.s || parsed.shared;

  if (shared && !Array.isArray(shared)) {
    shared = [shared];
  }

  if (shared) {
    shared.reverse();
  }

  if (shared && writeShared !== true) {
    sources = sources.filter((source) => {
      return shared.indexOf(source) === -1;
    });
  }

  return {
    sources: sources,
    shared: shared
  };
};

module.exports = parse;
