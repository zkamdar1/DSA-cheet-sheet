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
              <div className="p-4 bg-muted rounded-md mb-2">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v4l3 3"></path>
                  </svg>
                  <h3 className="font-medium">Estimated Total Time: 4-6 months</h3>
                </div>
                <p className="text-sm mt-2">This roadmap is designed for consistent practice of 1-2 hours per day, 5-6 days per week. Progress at your own pace and adjust timelines based on your schedule and prior experience.</p>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="mx-auto w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-medium">1</div>
                    <p className="text-xs mt-1">Fundamentals</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-medium">2</div>
                    <p className="text-xs mt-1">Intermediate</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-medium">3</div>
                    <p className="text-xs mt-1">Advanced</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-medium">4</div>
                    <p className="text-xs mt-1">Mastery</p>
                  </div>
                </div>
              </div>
            
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
                    <div className="bg-primary/5 p-3 rounded-md mt-2">
                      <h4 className="text-xs font-semibold">Key Milestones</h4>
                      <ul className="list-disc pl-6 text-xs space-y-1 mt-1">
                        <li>Implement a linked list from scratch</li>
                        <li>Code a hash table with basic collision handling</li>
                        <li>Write binary search without looking at references</li>
                        <li>Solve array manipulation problems in O(n) time</li>
                      </ul>
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
                    <div className="bg-primary/5 p-3 rounded-md mt-2">
                      <h4 className="text-xs font-semibold">Key Milestones</h4>
                      <ul className="list-disc pl-6 text-xs space-y-1 mt-1">
                        <li>Implement BFS and DFS from memory</li>
                        <li>Solve tree problems using recursion</li>
                        <li>Build a priority queue/heap implementation</li>
                        <li>Recognize and apply sliding window patterns</li>
                        <li>Solve basic dynamic programming problems</li>
                      </ul>
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
                    <div className="bg-primary/5 p-3 rounded-md mt-2">
                      <h4 className="text-xs font-semibold">Key Milestones</h4>
                      <ul className="list-disc pl-6 text-xs space-y-1 mt-1">
                        <li>Implement Union-Find with path compression</li>
                        <li>Solve 2D dynamic programming problems</li>
                        <li>Implement Dijkstra's algorithm</li>
                        <li>Apply topological sort to dependency problems</li>
                        <li>Optimize existing solutions with advanced techniques</li>
                      </ul>
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
                    <div className="bg-primary/5 p-3 rounded-md mt-2">
                      <h4 className="text-xs font-semibold">Key Milestones</h4>
                      <ul className="list-disc pl-6 text-xs space-y-1 mt-1">
                        <li>Complete 5+ timed mock interviews</li>
                        <li>Solve complex problems within 45 minutes</li>
                        <li>Clearly explain time/space complexity trade-offs</li>
                        <li>Create system design solutions for common interview questions</li>
                        <li>Review and optimize old solutions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md mt-4">
                <h3 className="font-medium mb-2">Tracking Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold">Weekly Review</h4>
                    <p className="text-sm">Schedule a weekly review session to:</p>
                    <ul className="list-disc pl-6 text-sm space-y-1 mt-1">
                      <li>Assess problems solved and concepts learned</li>
                      <li>Identify areas of struggle that need more focus</li>
                      <li>Plan specific problems/topics for the upcoming week</li>
                      <li>Revisit previously solved problems for retention</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold">Tracking Tools</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div className="border rounded p-2">
                        <p className="text-xs font-medium">Digital Tools</p>
                        <ul className="list-disc pl-5 text-xs">
                          <li>Notion or Trello boards</li>
                          <li>GitHub repositories</li>
                          <li>Spreadsheets with problem categories</li>
                        </ul>
                      </div>
                      <div className="border rounded p-2">
                        <p className="text-xs font-medium">Analog Methods</p>
                        <ul className="list-disc pl-5 text-xs">
                          <li>Dedicated DSA journal</li>
                          <li>Wall calendar with streaks</li>
                          <li>Problem-solving flashcards</li>
                        </ul>
                      </div>
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
        
        {/* Additional Resources */}
        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>
                Curated learning materials to supplement your DSA practice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Online Platforms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-md h-full">
                    <h4 className="text-sm font-semibold">Practice Platforms</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">LeetCode</p>
                          <p className="text-xs text-muted-foreground">Over 2000 coding problems with automated evaluation and discussion forums.</p>
                          <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">leetcode.com</a>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">HackerRank</p>
                          <p className="text-xs text-muted-foreground">Structured learning paths with challenges and competitions for developers.</p>
                          <a href="https://www.hackerrank.com" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">hackerrank.com</a>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">3</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">CodeForces</p>
                          <p className="text-xs text-muted-foreground">Regular programming competitions and practice problems for competitive programmers.</p>
                          <a href="https://codeforces.com" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">codeforces.com</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md h-full">
                    <h4 className="text-sm font-semibold">Interactive Learning</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Visualgo</p>
                          <p className="text-xs text-muted-foreground">Algorithm and data structure visualizations for better understanding.</p>
                          <a href="https://visualgo.net" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">visualgo.net</a>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">AlgoExpert</p>
                          <p className="text-xs text-muted-foreground">Curated list of interview questions with in-depth video explanations.</p>
                          <a href="https://www.algoexpert.io" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">algoexpert.io</a>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">3</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Interview Cake</p>
                          <p className="text-xs text-muted-foreground">Step-by-step approach to solve algorithmic problems with detailed explanations.</p>
                          <a href="https://www.interviewcake.com" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">interviewcake.com</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Books & Courses</h3>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="text-sm font-semibold mb-2">Essential Reading</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-12 w-9 bg-secondary rounded overflow-hidden flex items-center justify-center text-xs font-medium">
                        BOOK
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cracking the Coding Interview</p>
                        <p className="text-xs">by Gayle Laakmann McDowell</p>
                        <p className="text-xs text-muted-foreground mt-1">The most widely used book for coding interview preparation, with 189 programming questions and solutions.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-12 w-9 bg-secondary rounded overflow-hidden flex items-center justify-center text-xs font-medium">
                        BOOK
                      </div>
                      <div>
                        <p className="text-sm font-medium">Introduction to Algorithms</p>
                        <p className="text-xs">by Cormen, Leiserson, Rivest, and Stein</p>
                        <p className="text-xs text-muted-foreground mt-1">Known as "CLRS," this comprehensive textbook covers a broad range of algorithms and theoretical foundations.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-12 w-12 bg-secondary rounded overflow-hidden flex items-center justify-center text-xs font-medium">
                        COURSE
                      </div>
                      <div>
                        <p className="text-sm font-medium">Algorithms Specialization</p>
                        <p className="text-xs">by Stanford University (Coursera)</p>
                        <p className="text-xs text-muted-foreground mt-1">Four-course series covering algorithms and data structures taught by Tim Roughgarden.</p>
                        <a href="https://www.coursera.org/specializations/algorithms" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">View on Coursera</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">YouTube Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                          <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                          <polygon points="10 15 15 12 10 9"></polygon>
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium">Neetcode</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Popular platform with high-quality video solutions for LeetCode problems and organized problem patterns.</p>
                    <a href="https://neetcode.io" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2 inline-block">Visit Neetcode</a>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                          <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                          <polygon points="10 15 15 12 10 9"></polygon>
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium">Back To Back SWE</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">In-depth explanations of complex algorithmic problems with detailed visualizations.</p>
                    <a href="https://www.youtube.com/c/BackToBackSWE" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2 inline-block">Visit Channel</a>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                          <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                          <polygon points="10 15 15 12 10 9"></polygon>
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium">Tushar Roy</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Clear explanations of complex algorithms and data structures with code walkthroughs.</p>
                    <a href="https://www.youtube.com/user/tusharroy2525" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2 inline-block">Visit Channel</a>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                          <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                          <polygon points="10 15 15 12 10 9"></polygon>
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium">CS Dojo</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Beginner-friendly algorithm tutorials and programming interview preparation.</p>
                    <a href="https://www.youtube.com/c/CSDojo" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2 inline-block">Visit Channel</a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Coding Interview Preparation</h3>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="text-sm font-semibold mb-2">Mock Interview Platforms</h4>
                  <ul className="list-disc pl-6 text-sm space-y-1">
                    <li><strong>Pramp</strong> - Free peer-to-peer mock interviews with fellow engineers</li>
                    <li><strong>interviewing.io</strong> - Practice with anonymous engineers from top companies</li>
                    <li><strong>CodeSignal</strong> - Timed assessments and company-specific interview practice</li>
                    <li><strong>LeetCode Mock Interviews</strong> - Realistic interview simulations with time constraints</li>
                  </ul>
                  <p className="text-xs mt-3 italic">
                    Tip: Schedule regular mock interviews to practice explaining your thought process while solving problems under time pressure.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 