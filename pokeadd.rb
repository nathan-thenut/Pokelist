#! /usr/bin/env ruby

require 'optparse'
require 'json'

options = {}

# Global Variable for the notation of the pokemon stats
$pkmn_stats = ["KP", "ATK", "DEF", "SP.ATK", "SP.DEF", "INIT"]

subtext = <<HELP
Subcommands:
    add - Adds a new pokemon to the specified json file

    See 'pokeadd.rb COMMAND --help' for more information on a specific command.
HELP

global = OptionParser.new do |opts|
    opts.banner = "Usage: pokeadd.rb subcommand file,json"
    opts.separator ""
    opts.separator subtext
end

subcommands = {
    "add" => {
        :opts => OptionParser.new do |opts|
            opts.banner = "Usage: add [options]"
            opts.on("-f", "--file FILE") do |f|
                options[:file] = f
            end
        end,
        :call => [
            "add"
        ]
    }
}

def request_value(text)
    print "#{text}: "
    gets.chomp
end


def request_hash(text, keys)
    print "#{text}:\n"
    new_hash = Hash.new
    keys.each do |k|
        new_hash[k] = request_value(k)
    end
    return new_hash
end

def request_array(text, length)
    print "#{text}:\n"
    new_arr = Array.new
    i = 0
    while i < length do
        new_arr[i] = request_value("No. #{i+1}")
        i += 1
    end
    return new_arr
end

def add(options)
    pkmn = []
    prev_pkmn = ""
    
    if File.exist?(options[:file])
        prev_pkmn = IO.read(options[:file])
        pkmn = JSON.parse(prev_pkmn)
    end

    print "Adding a new Pokemon to #{options[:file]}\n"
    print "Please enter the following data of the pokemon.\n"
    print "If you do not have the data you can just press enter to continue.\n"
    new_pkmn = Hash.new
    new_pkmn["name"] = request_value("Name")
    new_pkmn["dexno"] = request_value("Pokedex Number")
    new_pkmn["type_one"] = request_value("First Type")
    new_pkmn["type_two"] = request_value("Second Type")
    new_pkmn["nature"] = request_value("Nature")
    new_pkmn["ability"] = request_value("Ability")
    new_pkmn["item"] = request_value("Item")

    new_pkmn["DV"] = request_hash("DVs", $pkmn_stats)
    new_pkmn["EV"] = request_hash("EVs", $pkmn_stats)

    new_pkmn["attacks"] = request_array("Attacken", 4)
    new_pkmn["gif"] = request_value("GIF Name")
    pkmn.push(new_pkmn)

       
    puts JSON.pretty_generate(pkmn)
    File.open(options[:file], "w") { |f| f.write(JSON.pretty_generate(pkmn)) }
end


global.order!

subcommand = subcommands[ARGV.shift]

if subcommand
    subcommand[:opts].order!
    subcommand[:call].each do |m|
        method(m).call(options)
    end
else
    puts global.help
end
