/*!*
 *
 *  Copyright (c) ORDBOK contributors. All rights reserved.
 *
 *  Licensed under the MIT License. See the LICENSE file in the project root.
 *
 *!*/

import
{
    deepStrictEqual,
    strictEqual
}
from 'assert';
import
{
    IMarkdownPage
}
from '@ordbok/core/dist';

/* *
 *
 *  Constants
 *
 * */

const ADJECTIVE_GRAMMAR = [
    ['Adjective'],
    ['Positive', 'Comparative', 'Superlative']
];

const ADJECTIVE_STRUCTURE = {
    8: [
        'Singular, Predicative, Feminine', 'Singular, Predicative, Masculine',
        'Singular, Predicative, Neuter', 'Plural, Predicative, Common',
        'Singular, Indefinite, Feminine', 'Singular, Indefinite, Masculine',
        'Singular, Indefinite, Neuter', 'Plural, Indefinite, Common'
    ],
    12: [
        'Singular, Predicative, Feminine', 'Singular, Predicative, Masculine',
        'Singular, Predicative, Neuter', 'Plural, Predicative, Common',
        'Singular, Indefinite, Feminine', 'Singular, Indefinite, Masculine',
        'Singular, Indefinite, Neuter', 'Plural, Indefinite, Common',
        'Singular, Definite, Feminine', 'Singular, Definite, Masculine',
        'Singular, Definite, Neuter', 'Plural, Definite, Common'
    ]
};

const DETERMINER_GRAMMAR = [
    ['Determiner'],
    ['Indefinite', 'Definite', 'First Person', 'Second Person', 'Third Person'],
    ['Indefinite', 'Singular', 'Plural'],
    ['Common', 'Feminine', 'Masculine', 'Neuter']
];

const DETERMINE_STRUCTURE = [
    'Singular, Feminine', 'Singular, Masculine', 'Singular, Neuter', 'Plural, Common'
]

const NOUN_STRUCTURE = [
    'Singular, Indefinite', 'Singular, Definite', 'Plural, Indefinite', 'Plural, Definite'
]

const NOUN_GRAMMAR = [
    ['Noun']
]

const SECTIONS = ['Grammar', 'Relation', 'Structure'];

const VERB_STRUCTURE = [
    'Singular, First Person', 'Singular, Second Person', 'Singular, Third Person',
    'Plural, First Person', 'Plural, Second Person', 'Plural, Third Person'
]

const VERB_GRAMMAR = [
    ['Verb'],
    ['Infinitive', 'Present', 'Past', 'Future', 'Present Perfect', 'Past Perfect', 'Future Perfect']
]

/* *
 *
 *  Functions
 *
 * */

/**
 * Tests the Meta section of a Markdown page.
 *
 * @param markdownPage
 *        Markdown page to test
 */
export function test (markdownPage: IMarkdownPage): void
{
    const markdownMeta = markdownPage['Meta'];

    if (!markdownMeta)
    {
        throw new Error('No meta headline found!');
    }

    const metaGrammar = (markdownMeta['Grammar'] || []);
    const metaStructure = (markdownMeta['Structure'] || []);

    if (!metaGrammar.length)
    {
        throw new Error('No meta grammar found!');
    }

    switch (metaGrammar[0])
    {
        default:
            throw new Error('Unexpected meta grammar type: ' + metaGrammar[0]);

        case ADJECTIVE_GRAMMAR[0][0]:
            testAdjective(metaGrammar, metaStructure);
            break;

        case DETERMINER_GRAMMAR[0][0]:
            testDeterminer(metaGrammar, metaStructure);
            break;

        case NOUN_GRAMMAR[0][0]:
            testNoun(metaGrammar, metaStructure);
            break;

        case 'Particle':
            testParticle(metaGrammar, metaStructure);
            break;

        case 'Phrase':
            testPhrase(metaGrammar, metaStructure);
            break;

        case 'Pronoun':
            testPronoun(metaGrammar, metaStructure);
            break;

        case 'Verb':
            testVerb(metaGrammar, metaStructure);
            break;
    }

    Object
        .keys(markdownMeta)
        .forEach(
            function (section: string): void
            {
                if (!SECTIONS.includes(section))
                {
                    throw new Error('Unexpected meta section found: ' + section);
                }
            }
        );
}

/**
 * Adjective tests
 *
 * @param grammar
 *        Grammar to test
 *
 * @param structure
 *        Structure to test
 */
function testAdjective (grammar: Array<string>, structure: Array<string>): void
{
    strictEqual(
        grammar.length,
        2,
        'Adjective grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        ADJECTIVE_GRAMMAR[1].includes(grammar[1]),
        true,
        'Adjective grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        structure.length === 8 || structure.length === 12,
        true,
        'Adjective structure is invalid: ' + structure.join(' ; ')
    );

    if (structure.length === 8) {
        deepStrictEqual(
            structure,
            ADJECTIVE_STRUCTURE[8],
            'Adjective structure is invalid: ' + structure.join(' ; ')
        );
    }
    else {
        deepStrictEqual(
            structure,
            ADJECTIVE_STRUCTURE[12],
            'Adjective structure is invalid: ' + structure.join(' ; ')
        );
    }
}

/**
 * Determiner tests
 *
 * @param grammar
 *        Grammar to test
 *
 * @param structure
 *        Structure to test
 */
function testDeterminer (grammar: Array<string>, structure: Array<string>): void
{
    strictEqual(
        grammar.length >= 2 && grammar.length <= 4,
        true,
        'Determiner grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        DETERMINER_GRAMMAR[1].includes(grammar[1]),
        true,
        'Determiner grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        grammar.length <= 2 ||
        DETERMINER_GRAMMAR[2].includes(grammar[2]) ||
        DETERMINER_GRAMMAR[3].includes(grammar[2]),
        true,
        'Determiner grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        grammar.length <= 3 ||
        DETERMINER_GRAMMAR[3].includes(grammar[3]),
        true,
        'Determiner grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        structure.length,
        4,
        'Determiner structure is invalid: ' + structure.join(' ; ')
    );

    deepStrictEqual(
        structure,
        DETERMINE_STRUCTURE,
        'Determiner structure is invalid: ' + structure.join(' ; ')
    );
}

/**
 * Noun tests
 *
 * @param grammar
 *        Grammar to test
 *
 * @param structure
 *        Structure to test
 */
function testNoun (grammar: Array<string>, structure: Array<string>): void
{
    strictEqual(
        grammar.length,
        1,
        'Noun grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        structure.length,
        4,
        'Noun structure is invalid: ' + structure.join(' ; ')
    );

    deepStrictEqual(
        structure,
        NOUN_STRUCTURE,
        'Noun structure is invalid: ' + structure.join(' ; ')
    );
}

function testParticle (grammar: Array<string>, structure: Array<string>): void
{
    strictEqual(
        grammar.length,
        1,
        'Particle grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        structure.length,
        0,
        'Particle structure is invalid: ' + structure.join(' ; ')
    );
}

function testPhrase (grammar: Array<string>, structure: Array<string>): void
{
    strictEqual(
        grammar.length,
        1,
        'Phrase grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        structure.length,
        0,
        'Phrase structure is invalid: ' + structure.join(' ; ')
    );
}

function testPronoun (grammar: Array<string>, structure: Array<string>): void
{
    strictEqual(
        grammar.length === 2 ||
        grammar.length === 3,
        true,
        'Pronoun grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        structure.length,
        4,
        'Pronoun structure is invalid: ' + structure.join(' ; ')
    );
}

function testVerb (grammar: Array<string>, structure: Array<string>): void
{
    strictEqual(
        grammar.length,
        2,
        'Verb grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        VERB_GRAMMAR[1].includes(grammar[1]),
        true,
        'Verb grammar is invalid: ' + grammar.join(' ; ')
    );

    strictEqual(
        structure.length,
        6,
        'Verb structure is invalid: ' + structure.join(' ; ')
    );

    deepStrictEqual(
        structure,
        VERB_STRUCTURE,
        'Verb structure is invalid: ' + structure.join(' ; ')
    );
}
