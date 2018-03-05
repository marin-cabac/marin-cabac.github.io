---
layout: post
title:      "Learning to code, i.e. I know that I know nothing"
date:       2018-03-05 18:42:33 +0000
permalink:  learning_to_code_i_e_i_know_that_i_know_nothing
---

Dir.chdir(@path)
This gives a clue that chdirdoes not find the requested subdirectory in the current working directory. Why ? Add a trace to display the current working directory :

def files
    puts "in files, path=#{@path}"
    puts "wd=...#{Dir.getwd.sub(/.*ruby(.*)/, '\1')}"
    current_dir = Dir.getwd
    Dir.chdir(@path)
...
and run the tests (I'm working in ...devl/ruby/zintlist/mp3_importer) :

$ rspec

MP3Importer
  #initialize
    accepts a file path to parse mp3 files from
  #files
in files, path=./spec/fixtures/mp3s
wd=.../zintlist/mp3_importer
    loads all the mp3 files in the path directory
  #xxxx
in files, path=./spec/fixtures/mp3s
wd=.../zintlist/mp3_importer/spec/fixtures/mp3s
