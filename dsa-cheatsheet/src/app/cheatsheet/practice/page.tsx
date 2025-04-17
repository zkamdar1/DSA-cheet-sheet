"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHashNavigation } from "@/lib/use-hash-navigation"

export default function PracticePage() {
  const { activeTab, setActiveTab } = useHashNavigation("approaches")
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Practice Recommendations</h1>
        <p className="text-muted-foreground">
          Strategies for effective practice and curated problem lists to improve your DSA skills.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap items-center justify-start">
          <TabsTrigger value="approaches">Practice Approaches</TabsTrigger>
          <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
          <TabsTrigger value="problems">Recommended Problems</TabsTrigger>
          <TabsTrigger value="resources">Additional Resources</TabsTrigger>
        </TabsList>
        
        {/* Practice Approaches */}
        <TabsContent value="approaches" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Effective Practice Strategies</CardTitle>
              <CardDescription>
                Techniques to maximize learning and retention from your practice sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Deliberate Practice Framework</h3>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="text-sm font-semibold mb-2">1. Set Specific Goals</h4>
                    <p className="text-sm mb-1">Focus on one concept or pattern at a time rather than solving random problems.</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Topic-specific goals: "Master sliding window pattern this week"</li>
                      <li>Time-bound goals: "Solve 2 tree problems daily for 10 days"</li>
                      <li>Complexity goals: "Improve all O(n²) solutions to O(n)"</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="text-sm font-semibold mb-2">2. Consistent Time Blocks</h4>
                    <p className="text-sm mb-1">Regular practice is more effective than cramming.</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Daily short sessions (45-90 minutes) are better than occasional marathon sessions</li>
                      <li>Block dedicated time on your calendar</li>
                      <li>Track your practice with a streak system for motivation</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="text-sm font-semibold mb-2">3. Active Problem Solving</h4>
                    <p className="text-sm mb-1">Don't just read solutions—actively engage with problems.</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Set a timer (20-30 minutes) and attempt to solve without help</li>
                      <li>Write pseudocode before coding</li>
                      <li>Talk through your approach out loud (rubber duck debugging)</li>
                      <li>If stuck, look for hints before full solutions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="text-sm font-semibold mb-2">4. Solution Review</h4>
                    <p className="text-sm mb-1">Learn from each problem, whether you solved it or not.</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>After solving, compare your solution with efficient alternatives</li>
                      <li>Study different approaches (not just the most optimized one)</li>
                      <li>Take notes on patterns and techniques used</li>
                      <li>Review your solution after a day to reinforce learning</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="text-sm font-semibold mb-2">5. Spaced Repetition</h4>
                    <p className="text-sm mb-1">Revisit problems to reinforce learning and prevent forgetting.</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Keep a list of problems you've solved</li>
                      <li>Revisit problems after 1 week, 2 weeks, and 1 month</li>
                      <li>Try to solve them again without looking at previous solutions</li>
                      <li>Use tools like Anki to create flashcards for key concepts</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Progress Tracking Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-md h-full">
                    <h4 className="text-sm font-semibold mb-2">Problem Journal</h4>
                    <p className="text-sm mb-1">Keep a structured record of each problem you solve.</p>
                    <p className="text-sm mb-2">For each problem, document:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Problem name and link</li>
                      <li>Date solved</li>
                      <li>Difficulty and tags/categories</li>
                      <li>Your approach and solution</li>
                      <li>Time/space complexity</li>
                      <li>What you learned</li>
                      <li>Follow-up ideas to optimize further</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md h-full">
                    <h4 className="text-sm font-semibold mb-2">Topic Mastery Grid</h4>
                    <p className="text-sm mb-1">Track your progress across different DSA topics.</p>
                    <p className="text-sm mb-2">Create a grid with:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1">
                      <li>Topics on one axis (arrays, trees, graphs, etc.)</li>
                      <li>Difficulty levels on the other axis (easy, medium, hard)</li>
                      <li>Fill in cells as you solve problems</li>
                      <li>Aim for balanced coverage across the grid</li>
                      <li>Identify and focus on weak areas</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Common Mistakes to Avoid</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="bg-muted px-2 py-1 rounded-full text-xs font-medium">❌</div>
                    <div>
                      <p className="text-sm font-medium">Rushing to code without planning</p>
                      <p className="text-xs text-muted-foreground">Instead, spend time understanding the problem and planning your approach before writing any code.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-muted px-2 py-1 rounded-full text-xs font-medium">❌</div>
                    <div>
                      <p className="text-sm font-medium">Jumping to solutions too quickly</p>
                      <p className="text-xs text-muted-foreground">Challenge yourself to solve problems independently before checking solutions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-muted px-2 py-1 rounded-full text-xs font-medium">❌</div>
                    <div>
                      <p className="text-sm font-medium">Only focusing on quantity</p>
                      <p className="text-xs text-muted-foreground">Solving 100 problems poorly is less effective than solving 30 problems thoroughly.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-muted px-2 py-1 rounded-full text-xs font-medium">❌</div>
                    <div>
                      <p className="text-sm font-medium">Memorizing solutions</p>
                      <p className="text-xs text-muted-foreground">Focus on understanding patterns and approaches rather than memorizing specific solutions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="bg-muted px-2 py-1 rounded-full text-xs font-medium">❌</div>
                    <div>
                      <p className="text-sm font-medium">Neglecting to test your code</p>
                      <p className="text-xs text-muted-foreground">Always test your solution with various inputs, including edge cases.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Learning Roadmap */}
        <TabsContent value="roadmap" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>DSA Learning Roadmap</CardTitle>
              <CardDescription>
                A structured path from beginner to advanced DSA mastery
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="relative pb-4 pl-6 border-l-2 border-muted">
                  <div className="absolute -left-[9px] top-0 h-5 w-5 rounded-full bg-primary"></div>
                  <h3 className="font-bold text-lg mb-1">Phase 1: Fundamentals (2-4 weeks)</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Data Structures</h4>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>Arrays and Strings</li>
                        <li>Hash Tables (Maps/Sets)</li>
                        <li>Linked Lists</li>
                        <li>Stacks and Queues</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Basic Algorithms</h4>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>Time and Space Complexity (Big-O)</li>
                        <li>Basic Searching (Linear, Binary)</li>
                        <li>Basic Sorting (Bubble, Insertion, Selection)</li>
                        <li>Two Pointers Technique</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Practice Goal</h4>
                      <p className="text-sm">Solve 20-30 easy problems focusing on these fundamental structures.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative pb-4 pl-6 border-l-2 border-muted">
                  <div className="absolute -left-[9px] top-0 h-5 w-5 rounded-full bg-primary/80"></div>
                  <h3 className="font-bold text-lg mb-1">Phase 2: Intermediate (4-6 weeks)</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Data Structures</h4>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>Trees (Binary Trees, BSTs)</li>
                        <li>Heaps/Priority Queues</li>
                        <li>Graphs (Representation)</li>
                        <li>Trie</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Algorithms</h4>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>Recursion and Backtracking</li>
                        <li>Merge Sort and Quick Sort</li>
                        <li>BFS and DFS</li>
                        <li>Sliding Window</li>
                        <li>Introduction to Dynamic Programming</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Practice Goal</h4>
                      <p className="text-sm">Solve 30-40 medium problems, with emphasis on tree traversals and graph searches.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative pb-4 pl-6 border-l-2 border-muted">
                  <div className="absolute -left-[9px] top-0 h-5 w-5 rounded-full bg-primary/60"></div>
                  <h3 className="font-bold text-lg mb-1">Phase 3: Advanced (6-8 weeks)</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Data Structures</h4>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>Advanced Tree Structures (AVL, Red-Black Trees)</li>
                        <li>Disjoint Set / Union Find</li>
                        <li>Segment Trees</li>
                        <li>Advanced Hash Map Techniques</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Algorithms</h4>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>Advanced Dynamic Programming</li>
                        <li>Greedy Algorithms</li>
                        <li>Shortest Path Algorithms (Dijkstra's, Bellman-Ford)</li>
                        <li>Minimum Spanning Trees</li>
                        <li>Topological Sort</li>
                        <li>String Matching Algorithms</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Practice Goal</h4>
                      <p className="text-sm">Solve 20-30 medium-hard problems with focus on complex graph algorithms and dynamic programming.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative pb-0 pl-6">
                  <div className="absolute -left-[9px] top-0 h-5 w-5 rounded-full bg-primary/40"></div>
                  <h3 className="font-bold text-lg mb-1">Phase 4: Mastery and Interview Preparation</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Specialized Topics</h4>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>Bit Manipulation</li>
                        <li>System Design Basics</li>
                        <li>Competitive Programming Techniques</li>
                        <li>Advanced Problem-Solving Strategies</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Interview Skills</h4>
                      <ul className="list-disc pl-6 text-sm space-y-1">
                        <li>Mock Interviews</li>
                        <li>Time-constrained Problem Solving</li>
                        <li>Explaining Solutions Clearly</li>
                        <li>Common Interview Questions by Company</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Practice Goal</h4>
                      <p className="text-sm">Solve 15-20 hard problems, participate in mock interviews, and review previously solved problems.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md mt-2">
                <h3 className="font-medium mb-2">Tips for Following the Roadmap</h3>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>Adjust the timeline based on your current knowledge and available time</li>
                  <li>Don't rush through phases—ensure you understand concepts before moving on</li>
                  <li>Revisit earlier phases periodically to reinforce fundamentals</li>
                  <li>Use multiple resources (books, courses, problem platforms) for diverse exposure</li>
                  <li>Form or join a study group for accountability and discussion</li>
                  <li>Track your progress and celebrate milestones</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Recommended Problems */}
        <TabsContent value="problems" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Problems</CardTitle>
              <CardDescription>
                Curated problem sets organized by data structure and algorithm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="arrays">
                <TabsList className="flex flex-wrap items-center justify-start">
                  <TabsTrigger value="arrays">Arrays & Strings</TabsTrigger>
                  <TabsTrigger value="linked-lists">Linked Lists</TabsTrigger>
                  <TabsTrigger value="trees">Trees & Graphs</TabsTrigger>
                  <TabsTrigger value="dp">Dynamic Programming</TabsTrigger>
                </TabsList>
                
                {/* Arrays & Strings Problems */}
                <TabsContent value="arrays" className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Easy Problems</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">Two Sum</h4>
                          <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">Easy</span>
                        </div>
                        <p className="text-xs mt-1">Find two numbers that add up to a specific target.</p>
                        <p className="text-xs text-muted-foreground mt-1">Techniques: Hash Table, Two Pointers</p>
                        <a href="https://leetcode.com/problems/two-sum/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">LeetCode #1</a>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">Valid Anagram</h4>
                          <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">Easy</span>
                        </div>
                        <p className="text-xs mt-1">Determine if two strings are anagrams of each other.</p>
                        <p className="text-xs text-muted-foreground mt-1">Techniques: Hash Table, Counting</p>
                        <a href="https://leetcode.com/problems/valid-anagram/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">LeetCode #242</a>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">Best Time to Buy and Sell Stock</h4>
                          <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">Easy</span>
                        </div>
                        <p className="text-xs mt-1">Find the maximum profit from buying and selling a stock.</p>
                        <p className="text-xs text-muted-foreground mt-1">Techniques: One Pass, Kadane's Algorithm</p>
                        <a href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">LeetCode #121</a>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">Valid Palindrome</h4>
                          <span className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded">Easy</span>
                        </div>
                        <p className="text-xs mt-1">Check if a string is a palindrome (ignoring non-alphanumeric characters).</p>
                        <p className="text-xs text-muted-foreground mt-1">Techniques: Two Pointers, String Manipulation</p>
                        <a href="https://leetcode.com/problems/valid-palindrome/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">LeetCode #125</a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Medium Problems</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">3Sum</h4>
                          <span className="text-xs bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded">Medium</span>
                        </div>
                        <p className="text-xs mt-1">Find all unique triplets that sum to zero.</p>
                        <p className="text-xs text-muted-foreground mt-1">Techniques: Two Pointers, Sorting</p>
                        <a href="https://leetcode.com/problems/3sum/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">LeetCode #15</a>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">Longest Substring Without Repeating Characters</h4>
                          <span className="text-xs bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded">Medium</span>
                        </div>
                        <p className="text-xs mt-1">Find the length of the longest substring without repeating characters.</p>
                        <p className="text-xs text-muted-foreground mt-1">Techniques: Sliding Window, Hash Table</p>
                        <a href="https://leetcode.com/problems/longest-substring-without-repeating-characters/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">LeetCode #3</a>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">Product of Array Except Self</h4>
                          <span className="text-xs bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded">Medium</span>
                        </div>
                        <p className="text-xs mt-1">Calculate the product of all elements except the current one.</p>
                        <p className="text-xs text-muted-foreground mt-1">Techniques: Array Manipulation, Prefix Products</p>
                        <a href="https://leetcode.com/problems/product-of-array-except-self/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">LeetCode #238</a>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">Group Anagrams</h4>
                          <span className="text-xs bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded">Medium</span>
                        </div>
                        <p className="text-xs mt-1">Group strings that are anagrams of each other.</p>
                        <p className="text-xs text-muted-foreground mt-1">Techniques: Hash Table, Categorization</p>
                        <a href="https://leetcode.com/problems/group-anagrams/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">LeetCode #49</a>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Hard Problems</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">Minimum Window Substring</h4>
                          <span className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">Hard</span>
                        </div>
                        <p className="text-xs mt-1">Find the minimum window that contains all characters of a target string.</p>
                        <p className="text-xs text-muted-foreground mt-1">Techniques: Sliding Window, Hash Table</p>
                        <a href="https://leetcode.com/problems/minimum-window-substring/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">LeetCode #76</a>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">Trapping Rain Water</h4>
                          <span className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">Hard</span>
                        </div>
                        <p className="text-xs mt-1">Calculate how much water can be trapped after raining.</p>
                        <p className="text-xs text-muted-foreground mt-1">Techniques: Two Pointers, Dynamic Programming</p>
                        <a href="https://leetcode.com/problems/trapping-rain-water/" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">LeetCode #42</a>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Other problem categories would go here */}
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other practice sections would go here */}
      </Tabs>
    </div>
  )
} 