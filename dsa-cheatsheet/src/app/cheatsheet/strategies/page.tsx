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
                <div className="bg-muted p-4 rounded-md ml-4 space-y-3">
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
                <div className="bg-muted p-4 rounded-md ml-4 space-y-3">
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
                <div className="bg-muted p-4 rounded-md ml-4 space-y-3">
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
                <div className="bg-muted p-4 rounded-md ml-4 space-y-3">
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
                <div className="bg-muted p-4 rounded-md ml-4 space-y-3">
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
                  <div className="bg-muted p-4 rounded-md space-y-2">
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
                  <div className="bg-muted p-4 rounded-md space-y-2">
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
                  <div className="bg-muted p-4 rounded-md space-y-2">
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
                  <div className="bg-muted p-4 rounded-md space-y-2">
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
        
        {/* Optimization Techniques */}
        <TabsContent value="optimization" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Techniques</CardTitle>
              <CardDescription>
                Strategies to improve the efficiency of your algorithmic solutions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted p-4 rounded-md space-y-3">
                  <h3 className="font-medium">Time Complexity Optimization</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Caching and Memoization</h4>
                      <p className="text-sm">Store results of expensive function calls to avoid redundant calculations.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Fibonacci numbers, recursive function calls</p>
                      <p className="text-xs mt-1">Implementation: Use a hash map to store function results keyed by their inputs.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Pre-computation and Lookup Tables</h4>
                      <p className="text-sm">Compute values ahead of time and use lookup to avoid expensive calculations.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Prefix sums, cumulative products, precomputed factorials</p>
                      <p className="text-xs mt-1">Implementation: Initialize arrays or tables with precomputed values before main algorithm execution.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Early Termination</h4>
                      <p className="text-sm">Stop processing as soon as the answer is found or when further processing is unnecessary.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Binary search, string matching, constraint satisfaction</p>
                      <p className="text-xs mt-1">Implementation: Add conditional checks that exit loops or recursion when conditions are met.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md space-y-3">
                  <h3 className="font-medium">Space Complexity Optimization</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">In-place Algorithms</h4>
                      <p className="text-sm">Modify input data structures directly instead of creating new ones.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: In-place sort, array manipulation, matrix rotation</p>
                      <p className="text-xs mt-1">Implementation: Use temporary variables, swapping, or pointer manipulation to avoid allocating extra memory.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Space-Efficient Data Structures</h4>
                      <p className="text-sm">Choose data structures that minimize memory overhead for the specific use case.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Bit manipulation, sparse matrices, compressed structures</p>
                      <p className="text-xs mt-1">Implementation: Use primitive arrays instead of objects when possible, bit vectors for boolean flags.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Rolling/Sliding Window Variables</h4>
                      <p className="text-sm">Keep track of only the most recent data needed rather than entire history.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Moving average, sliding window problems</p>
                      <p className="text-xs mt-1">Implementation: Update variables in-place as you process new elements, discarding old data.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md space-y-3">
                  <h3 className="font-medium">Data Structure Optimizations</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Hash Tables for O(1) Lookup</h4>
                      <p className="text-sm">Use hash-based data structures to achieve constant-time operations.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Two Sum, frequency counting, duplicate detection</p>
                      <p className="text-xs mt-1">Implementation: Map values to indices, count occurrences, or track presence for quick lookups.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Specialized Data Structures</h4>
                      <p className="text-sm">Choose the right data structure for specific operation patterns.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Heap for priority access, Trie for prefix matching, Union-Find for disjoint sets</p>
                      <p className="text-xs mt-1">Implementation: Identify the core operations needed and select data structures optimized for those operations.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Balanced Trees</h4>
                      <p className="text-sm">Use tree structures that maintain balance to ensure logarithmic operations.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Sorted data access, range queries, interval problems</p>
                      <p className="text-xs mt-1">Implementation: Use AVL trees, Red-Black trees, or built-in balanced tree structures from standard libraries.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-md space-y-3">
                  <h3 className="font-medium">Algorithm Design Optimizations</h3>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Amortized Analysis</h4>
                      <p className="text-sm">Distribute the cost of expensive operations over multiple operations.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Dynamic arrays, two-stack queues, splay trees</p>
                      <p className="text-xs mt-1">Implementation: Design algorithms where occasional expensive operations are balanced by many cheap ones.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Lazy Evaluation</h4>
                      <p className="text-sm">Delay computation until results are actually needed.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Range updates, tree traversals</p>
                      <p className="text-xs mt-1">Implementation: Store operations to be performed later, and only perform them when their results are needed.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Problem Transformation</h4>
                      <p className="text-sm">Reformulate the problem into an equivalent, more tractable form.</p>
                      <p className="text-xs text-muted-foreground mt-1">Examples: Graph problems as matrix operations, geometric problems via coordinate transformations</p>
                      <p className="text-xs mt-1">Implementation: Identify equivalent representations that allow more efficient solutions.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md mt-4">
                <h3 className="font-medium mb-2">Optimization Decision Framework</h3>
                <p className="text-sm mb-2">
                  Follow these steps when optimizing your solution:
                </p>
                <ol className="list-decimal pl-6 space-y-1 text-sm">
                  <li><strong>Identify the bottleneck:</strong> Use time and space complexity analysis to identify the most expensive part of your algorithm.</li>
                  <li><strong>Consider trade-offs:</strong> Understand the relationship between time and space complexity; often you can trade one for the other.</li>
                  <li><strong>Choose the right data structure:</strong> Select data structures that optimize for your most frequent operations.</li>
                  <li><strong>Leverage problem properties:</strong> Use specific characteristics of the problem (sortedness, constraints, patterns) to optimize.</li>
                  <li><strong>Measure impact:</strong> Ensure your optimization actually improves performance for relevant input sizes and patterns.</li>
                </ol>
                <p className="text-sm mt-3 italic">
                  Remember: Premature optimization is the root of all evil. Start with a correct solution, then optimize based on actual performance needs.
                </p>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Case Study: Array Sum Range Queries</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Problem</h4>
                    <p className="text-sm">
                      Given an array of integers and multiple queries asking for the sum of elements in a range [start, end], 
                      design an efficient solution.
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Approach 1: Brute Force (No Optimization)</h4>
                    <p className="text-sm">For each query, sum the elements in the range by iterating through them.</p>
                    <p className="text-xs text-muted-foreground">Time Complexity: O(n) per query, where n is the range size</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Approach 2: Prefix Sum (Precomputation)</h4>
                    <p className="text-sm">Precompute prefix sums, then calculate range sum as prefix[end] - prefix[start-1].</p>
                    <p className="text-xs text-muted-foreground">Time Complexity: O(n) precomputation, O(1) per query</p>
                    <p className="text-xs">This optimization trades preprocessing time for faster query responses, ideal for multiple queries.</p>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Approach 3: Segment Tree (Advanced)</h4>
                    <p className="text-sm">Build a segment tree for handling range queries and potential updates efficiently.</p>
                    <p className="text-xs text-muted-foreground">Time Complexity: O(n) for building, O(log n) per query or update</p>
                    <p className="text-xs">This more complex data structure is optimal when the array values can change between queries.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Common Pitfalls */}
        <TabsContent value="pitfalls" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Pitfalls</CardTitle>
              <CardDescription>
                Frequent mistakes to avoid when solving algorithm and data structure problems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Implementation Errors</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Off-by-One Errors</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Incorrect loop termination conditions (using &lt; instead of &lt;=)</li>
                      <li>Miscalculating array indices or boundaries</li>
                      <li>Improperly handling zero-indexing vs. one-indexing</li>
                    </ul>
                    <div className="mt-2 bg-muted p-3 rounded-md">
                      <p className="text-sm italic">
                        <span className="font-medium">Example:</span> When iterating through an array of length n, 
                        using <code>for (i = 1; i &lt; = n; i++)</code> instead of <code>for (i = 0; i &lt; n; i++)</code>
                        would miss the first element and potentially access out-of-bounds memory.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Integer Overflow/Underflow</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Not accounting for the range limitations of numeric types</li>
                      <li>Performing calculations that exceed the maximum value of the data type</li>
                      <li>Using inappropriate data types for large numbers</li>
                    </ul>
                    <div className="mt-2 bg-muted p-3 rounded-md">
                      <p className="text-sm italic">
                        <span className="font-medium">Example:</span> In a problem involving factorial calculations,
                        using a standard 32-bit integer will overflow at 13! (6,227,020,800), producing incorrect results.
                        Use long integers or BigInteger types for such cases.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Uninitialized Variables</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Using variables before setting an initial value</li>
                      <li>Forgetting to initialize counters, arrays, or data structures</li>
                      <li>Resetting variables inside loops when they should persist</li>
                    </ul>
                    <div className="mt-2 bg-muted p-3 rounded-md">
                      <p className="text-sm italic">
                        <span className="font-medium">Example:</span> In a maximum subarray sum problem, 
                        forgetting to initialize <code>maxSum = Integer.MIN_VALUE</code> or <code>maxSum = arr[0]</code> 
                        before the loop might lead to incorrect results, especially with all-negative arrays.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Algorithm Design Mistakes</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Greedy Approach When DP Is Needed</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Assuming a locally optimal choice will lead to a globally optimal solution</li>
                      <li>Not recognizing the need for dynamic programming</li>
                      <li>Failing to identify overlapping subproblems</li>
                    </ul>
                    <div className="mt-2 bg-muted p-3 rounded-md">
                      <p className="text-sm italic">
                        <span className="font-medium">Example:</span> In the "Coin Change" problem, a greedy approach 
                        (always pick the largest denomination) works for some coin systems (like US currency) but fails for others. 
                        A dynamic programming approach is required for the general case.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Ignoring Edge Cases</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Not handling empty inputs or boundary conditions</li>
                      <li>Overlooking special cases (e.g., all negative numbers, duplicates)</li>
                      <li>Assuming inputs will always be well-formed or within constraints</li>
                    </ul>
                    <div className="mt-2 bg-muted p-3 rounded-md">
                      <p className="text-sm italic">
                        <span className="font-medium">Example:</span> In a binary search implementation, not properly 
                        handling empty arrays or single-element arrays can lead to infinite loops or incorrect results.
                        Always test your solution with: empty input, single element, two elements, and standard cases.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Inefficient Data Structure Choice</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Using arrays when hash tables would be more efficient</li>
                      <li>Using nested loops when a more efficient data structure exists</li>
                      <li>Not leveraging specialized data structures for specific operations</li>
                    </ul>
                    <div className="mt-2 bg-muted p-3 rounded-md">
                      <p className="text-sm italic">
                        <span className="font-medium">Example:</span> In a "Find Duplicate" problem, using nested loops 
                        (O(n²)) instead of a hash set (O(n)) significantly impacts performance. Similarly, using an array 
                        to track frequency when a hash map would allow O(1) lookups.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Testing and Debugging Pitfalls</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Insufficient Test Cases</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Only testing with the examples provided in the problem</li>
                      <li>Not creating custom test cases for edge conditions</li>
                      <li>Failing to test with large inputs or stress tests</li>
                    </ul>
                    <div className="mt-2 bg-muted p-3 rounded-md">
                      <p className="text-sm italic">
                        <span className="font-medium">Example:</span> In a "Palindrome Checker" function, only testing with
                        simple examples like "racecar" but missing edge cases like empty strings, single characters,
                        strings with spaces or punctuation, or very long strings.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium">Ineffective Debugging</h4>
                    <ul className="list-disc pl-6 space-y-1 text-sm">
                      <li>Making multiple changes at once, making it hard to isolate issues</li>
                      <li>Not using systematic debugging approaches (e.g., binary search debugging)</li>
                      <li>Adding print statements without clear purpose or structure</li>
                    </ul>
                    <div className="mt-2 bg-muted p-3 rounded-md">
                      <p className="text-sm italic">
                        <span className="font-medium">Example:</span> When debugging a sorting algorithm, changing both the
                        comparison logic and the swap mechanism simultaneously makes it difficult to determine which change fixed
                        or caused an issue. Make one change at a time and test after each modification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md mt-4">
                <h3 className="font-medium mb-2">Debugging Checklist</h3>
                <p className="text-sm mb-2">
                  When your solution isn't working as expected, systematically check these common issues:
                </p>
                <ol className="list-decimal pl-6 space-y-1 text-sm">
                  <li><strong>Array bounds:</strong> Are your loop indices correct? Are you accessing valid array positions?</li>
                  <li><strong>Edge cases:</strong> Have you tested with empty inputs, single elements, or other boundary conditions?</li>
                  <li><strong>Variable initialization:</strong> Are all variables properly initialized before use?</li>
                  <li><strong>Off-by-one errors:</strong> Are your loop conditions correct? Should you use &lt; or &lt;=?</li>
                  <li><strong>Logic validation:</strong> Does your algorithm handle all possible input scenarios correctly?</li>
                  <li><strong>Time complexity:</strong> Is your solution efficient enough for the constraints given?</li>
                  <li><strong>Overflow/underflow:</strong> Could your calculations exceed the range of your data types?</li>
                  <li><strong>Comparison operators:</strong> Are you using the correct operators (==, !=, &lt;, &gt;)?</li>
                </ol>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Common Misconceptions</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="mr-3 text-lg font-semibold text-red-500">✗</div>
                    <div>
                      <p className="text-sm font-medium">"The first working solution is good enough"</p>
                      <p className="text-sm">It's tempting to stop once you have a working solution, but your first approach is rarely optimal.</p>
                      <p className="text-xs mt-1 text-muted-foreground">Always consider if there are more efficient approaches, especially in terms of time and space complexity.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-3 text-lg font-semibold text-red-500">✗</div>
                    <div>
                      <p className="text-sm font-medium">"More complex algorithms are always better"</p>
                      <p className="text-sm">Complex algorithms are not inherently better than simpler ones with the same complexity.</p>
                      <p className="text-xs mt-1 text-muted-foreground">Prioritize code clarity and correctness. Only add complexity when it provides tangible benefits.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="mr-3 text-lg font-semibold text-red-500">✗</div>
                    <div>
                      <p className="text-sm font-medium">"I can optimize later"</p>
                      <p className="text-sm">While premature optimization should be avoided, ignoring efficiency entirely can lead to solutions that fail with larger inputs.</p>
                      <p className="text-xs mt-1 text-muted-foreground">Consider the time and space complexity of your approach from the beginning, especially for the expected input size.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 