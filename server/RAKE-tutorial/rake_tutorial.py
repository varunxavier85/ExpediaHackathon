__author__ = 'a_medelyan'

import rake
import operator

# EXAMPLE ONE - SIMPLE
stoppath = "RAKE-tutorial\SmartStoplist.txt"

# 1. initialize RAKE by providing a path to a stopwords file
#rake_object = rake.Rake(stoppath, 5, 3, 4)

# 2. run on RAKE on a given text
#sample_file = open("data/docs/fao_test/w2167e.txt", 'r')
#text = sample_file.read()

#keywords = rake_object.run(text)

# 3. print results
#print "Keywords:", keywords

print "----------"
# EXAMPLE TWO - BEHIND THE SCENES (from https://github.com/aneesha/RAKE/rake.py)

# 1. initialize RAKE by providing a path to a stopwords file
rake_object = rake.Rake(stoppath)

text = "from seattle to sheraton los angeles in march 2017"



# 1. Split text into sentences
sentenceList = rake.split_sentences(text)

for sentence in sentenceList:
    print "Sentence:", sentence

# generate candidate keywords
stopwordpattern = rake.build_stop_word_regex(stoppath)
phraseList = rake.generate_candidate_keywords(sentenceList, stopwordpattern)
print "Phrases:", phraseList

# calculate individual word scores
wordscores = rake.calculate_word_scores(phraseList)

# generate candidate keyword scores
keywordcandidates = rake.generate_candidate_keyword_scores(phraseList, wordscores)
for candidate in keywordcandidates.keys():
    print "Candidate: ", candidate, ", score: ", keywordcandidates.get(candidate)

# sort candidates by score to determine top-scoring keywords
sortedKeywords = sorted(keywordcandidates.iteritems(), key=operator.itemgetter(1), reverse=True)
totalKeywords = len(sortedKeywords)

# for example, you could just take the top third as the final keywords
for keyword in sortedKeywords[0:(totalKeywords / 3)]:
    print "Keyword: ", keyword[0], ", score: ", keyword[1]

print rake_object.run(text)
