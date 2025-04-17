"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHashNavigation } from "@/lib/use-hash-navigation"

export default function StrategiesPage() {
  const { activeTab, setActiveTab } = useHashNavigation("approach")
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Problem-Solving Strategies</h1>
        <p className="text-muted-foreground">
          Systematic approaches to tackle algorithm and data structure problems effectively.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap items-center justify-start">
          <TabsTrigger value="approach">Systematic Approach</TabsTrigger>
          <TabsTrigger value="problem-types">Common Problem Types</TabsTrigger>
          <TabsTrigger value="optimization">Optimization Techniques</TabsTrigger>
          <TabsTrigger value="pitfalls">Common Pitfalls</TabsTrigger>
        </TabsList>
        
        {/* Systematic Approach */}
        <TabsContent value="approach" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Systematic Problem-Solving</CardTitle>
              <CardDescription>
                A structured methodology to approach any coding interview problem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Step 1: Understand the Problem</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Ask Clarifying Questions</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>What are the input constraints? (size, range of values, etc.)</li>
                      <li>Are there any edge cases to consider? (empty inputs, negative numbers, etc.)</li>
                      <li>Can there be multiple valid outputs?</li>
                      <li>Is the input sorted or in any particular order?</li>
                      <li>How large is the input data? (affects time/space complexity requirements)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Work Through Examples</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Try simple examples to understand the problem</li>
                      <li>Use examples from the problem statement</li>
                      <li>Create your own examples, especially edge cases</li>
                      <li>Solve examples manually to understand the process</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-2 bg-muted p-3 rounded-md">
                  <p className="text-sm italic">
                    <span className="font-medium">Example:</span> For a "Two Sum" problem, ask: Can the array have negative numbers? 
                    Can we use the same element twice? Is the array sorted? Work through examples like [2, 7, 11, 15] with target 9 
                    to understand how to find pairs that sum to the target.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Step 2: Devise a Plan</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Consider Multiple Approaches</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Start with a brute force solution</li>
                      <li>Look for patterns in the problem</li>
                      <li>Think about using common data structures (hash tables, trees, etc.)</li>
                      <li>Consider using common algorithms (sorting, binary search, etc.)</li>
                      <li>Apply problem-solving patterns (two pointers, sliding window, etc.)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Analyze Complexity</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Determine the time complexity of each approach</li>
                      <li>Determine the space complexity of each approach</li>
                      <li>Choose the most efficient solution given the constraints</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-2 bg-muted p-3 rounded-md">
                  <p className="text-sm italic">
                    <span className="font-medium">Example:</span> For the "Two Sum" problem, you might consider:
                    <br />- Brute force: Check all pairs (O(n²) time, O(1) space)
                    <br />- Hash table: Store values and check for complements (O(n) time, O(n) space)
                    <br />- Two pointers: If the array is sorted (O(n log n) for sorting + O(n) for finding)
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Step 3: Implement the Solution</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Write Clean, Modular Code</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Use meaningful variable and function names</li>
                      <li>Break down complex logic into smaller functions</li>
                      <li>Handle edge cases explicitly</li>
                      <li>Add comments for non-obvious logic</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Think Aloud</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Explain your approach as you code</li>
                      <li>Discuss trade-offs of your implementation</li>
                      <li>Mention alternative approaches you considered</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-2 bg-muted p-3 rounded-md">
                  <p className="text-sm italic">
                    <span className="font-medium">Example:</span> For the hash table approach to "Two Sum":
                    <br />1. Create a hash map to store values and their indices
                    <br />2. Iterate through the array, for each element:
                    <br />   a. Calculate the complement (target - current)
                    <br />   b. Check if the complement exists in the hash map
                    <br />   c. If found, return the current index and the complement's index
                    <br />   d. Otherwise, add the current element and its index to the hash map
                    <br />3. If no pair is found, return an appropriate result
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Step 4: Test Your Solution</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Test with Various Inputs</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Normal cases from the problem statement</li>
                      <li>Edge cases (empty arrays, single elements, etc.)</li>
                      <li>Large inputs to verify performance</li>
                      <li>Negative numbers or other special cases</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Debug Systematically</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Trace through the code with a specific example</li>
                      <li>Use print statements or a debugger</li>
                      <li>Check each step of your algorithm</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-2 bg-muted p-3 rounded-md">
                  <p className="text-sm italic">
                    <span className="font-medium">Example:</span> For "Two Sum", test with:
                    <br />- Simple case: [2, 7, 11, 15], target = 9 → [0, 1]
                    <br />- Negative numbers: [-1, -2, -3, -4, -5], target = -8 → [2, 4]
                    <br />- No solution: [1, 2, 3], target = 7 → []
                    <br />- Same element: [3, 3], target = 6 → [0, 1]
                    <br />- Single element: [5], target = 5 → []
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Step 5: Optimize Further</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Refine Your Solution</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Look for redundant operations</li>
                      <li>Consider more efficient data structures</li>
                      <li>Optimize space usage if possible</li>
                      <li>Consider trade-offs between time and space complexity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Discuss Improvements</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Explain how your solution could be improved</li>
                      <li>Discuss how the solution might scale with larger inputs</li>
                      <li>Consider if there are any system design implications</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-2 bg-muted p-3 rounded-md">
                  <p className="text-sm italic">
                    <span className="font-medium">Example:</span> For "Two Sum" with hash table approach:
                    <br />- We could potentially optimize space by using a single-pass approach
                    <br />- If the array is already sorted, the two-pointer approach might be more space-efficient
                    <br />- For very large arrays, we might need to consider external sorting or other techniques
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Common Problem Types */}
        <TabsContent value="problem-types" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Problem Types</CardTitle>
              <CardDescription>
                Recognizing and approaching different categories of problems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Array and String Problems</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Search and Sort</h4>
                      <p className="text-sm">Problems involving finding elements or arranging them in order.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Binary Search, Merge Sort, Quick Sort</p>
                      <p className="text-xs mt-1">Strategy: Consider whether sorting would help, or if using hash tables could optimize search operations.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Sliding Window</h4>
                      <p className="text-sm">Problems involving subarrays or substrings with specific properties.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Maximum Sum Subarray, Longest Substring Without Repeating Characters</p>
                      <p className="text-xs mt-1">Strategy: Maintain a window that grows or shrinks based on the problem constraints.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Two Pointers</h4>
                      <p className="text-sm">Problems involving pairs, triplets, or subarrays.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Two Sum, Three Sum, Container With Most Water</p>
                      <p className="text-xs mt-1">Strategy: Use multiple pointers to traverse the array, often from different ends or at different speeds.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Graph and Tree Problems</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Tree Traversal</h4>
                      <p className="text-sm">Problems involving visiting all nodes in a tree.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Binary Tree Traversal, Validate BST, Find LCA</p>
                      <p className="text-xs mt-1">Strategy: Use recursion for depth-first traversals or queues for breadth-first traversals.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Graph Search</h4>
                      <p className="text-sm">Problems involving finding paths or connections in a graph.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Shortest Path, Network Flow, Cycle Detection</p>
                      <p className="text-xs mt-1">Strategy: Use BFS for shortest paths in unweighted graphs, DFS for connectivity, Dijkstra's or Bellman-Ford for weighted graphs.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Topological Sort</h4>
                      <p className="text-sm">Problems involving ordering tasks with dependencies.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Course Schedule, Task Scheduling</p>
                      <p className="text-xs mt-1">Strategy: Use DFS or BFS with in-degree counting to find a valid ordering.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Dynamic Programming Problems</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Optimization Problems</h4>
                      <p className="text-sm">Problems involving finding the maximum/minimum value.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Knapsack Problem, Longest Increasing Subsequence</p>
                      <p className="text-xs mt-1">Strategy: Define a state, establish a recurrence relation, and build a solution bottom-up or top-down with memoization.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Counting Problems</h4>
                      <p className="text-sm">Problems involving counting the number of ways to do something.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Climbing Stairs, Unique Paths, Coin Change</p>
                      <p className="text-xs mt-1">Strategy: Define a state that represents a subproblem, then count ways by combining solutions to smaller subproblems.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">String Matching</h4>
                      <p className="text-sm">Problems involving string patterns or edit operations.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Edit Distance, Regular Expression Matching</p>
                      <p className="text-xs mt-1">Strategy: Use a 2D DP table to track matches or edits at each position in the strings.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Miscellaneous Problems</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Divide and Conquer</h4>
                      <p className="text-sm">Problems that can be broken down into smaller, similar subproblems.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Merge Sort, Quick Sort, Binary Search</p>
                      <p className="text-xs mt-1">Strategy: Divide the problem into smaller instances, solve them recursively, then combine the results.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Greedy Algorithms</h4>
                      <p className="text-sm">Problems where local optimal choices lead to a global optimal solution.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Activity Selection, Huffman Coding, Dijkstra's Algorithm</p>
                      <p className="text-xs mt-1">Strategy: Make the locally optimal choice at each step, without reconsidering previous choices.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Design Problems</h4>
                      <p className="text-sm">Problems involving designing data structures or systems.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: LRU Cache, Min Stack, Design Twitter</p>
                      <p className="text-xs mt-1">Strategy: Identify the key operations, choose appropriate data structures, and implement methods efficiently.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md mt-4">
                <h3 className="font-medium mb-2">Recognizing Problem Types</h3>
                <p className="text-sm mb-2">
                  Pay attention to these key indicators in problem statements:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Mentions of subarrays/substrings:</strong> Consider sliding window approach</li>
                  <li><strong>Finding pairs/triplets:</strong> Consider two pointers or hash tables</li>
                  <li><strong>Asking for all possible ways/combinations:</strong> Consider recursion or dynamic programming</li>
                  <li><strong>Problems on sorted arrays:</strong> Consider binary search or two pointers</li>
                  <li><strong>Optimization problems (min/max):</strong> Consider dynamic programming or greedy approach</li>
                  <li><strong>Path finding or connectivity:</strong> Consider graph algorithms (BFS/DFS)</li>
                  <li><strong>Hierarchical structures:</strong> Consider tree traversals or recursion</li>
                  <li><strong>Looking for patterns:</strong> Consider hash tables for counting or tracking</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other strategy sections would go here */}
      </Tabs>
    </div>
  )
} 