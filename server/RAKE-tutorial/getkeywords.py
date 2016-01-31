import rake
import operator
import sys

# EXAMPLE ONE - SIMPLE
stoppath = "RAKE-tutorial/SmartStoplist.txt"

# 1. initialize RAKE by providing a path to a stopwords file
rake_object = rake.Rake(stoppath)

text = sys.argv[1]



# 1. Split text into sentences
sentenceList = rake.split_sentences(text)

# for sentence in sentenceList:
#     print "Sentence:", sentence

# generate candidate keywords
stopwordpattern = rake.build_stop_word_regex(stoppath)
phraseList = rake.generate_candidate_keywords(sentenceList, stopwordpattern)
print phraseList

# calculate individual word scores
# wordscores = rake.calculate_word_scores(phraseList)

# # generate candidate keyword scores
# keywordcandidates = rake.generate_candidate_keyword_scores(phraseList, wordscores)
# for candidate in keywordcandidates.keys():
#     print "Candidate: ", candidate, ", score: ", keywordcandidates.get(candidate)

# # sort candidates by score to determine top-scoring keywords
# sortedKeywords = sorted(keywordcandidates.iteritems(), key=operator.itemgetter(1), reverse=True)
# totalKeywords = len(sortedKeywords)

# # for example, you could just take the top third as the final keywords
# for keyword in sortedKeywords[0:(totalKeywords / 3)]:
#     print "Keyword: ", keyword[0], ", score: ", keyword[1]

# print rake_object.run(text)