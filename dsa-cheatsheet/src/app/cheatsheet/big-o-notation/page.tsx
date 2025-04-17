"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DiagramBox } from "@/components/DiagramBox"
import { useHashNavigation } from "@/lib/use-hash-navigation"

export default function BigONotationPage() {
  const { activeTab, setActiveTab } = useHashNavigation("introduction")
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Big-O Notation</h1>
        <p className="text-muted-foreground">
          Understanding algorithmic time and space complexity
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap items-center justify-start">
          <TabsTrigger value="introduction">Introduction</TabsTrigger>
          <TabsTrigger value="common-complexities">Common Complexities</TabsTrigger>
          <TabsTrigger value="analysis">Analyzing Algorithms</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>
        
        {/* Introduction Content */}
        <TabsContent value="introduction" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>What is Big-O Notation?</CardTitle>
              <CardDescription>
                The mathematical notation to describe the performance of algorithms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Big-O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it's used to classify algorithms according to how their running time or space requirements grow as the input size grows.
              </p>
              
              <div>
                <h3 className="font-medium mb-2">Key Concepts</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Worst-case scenario:</strong> Big-O typically describes the upper bound of an algorithm's time complexity</li>
                  <li><strong>Growth rate:</strong> Focuses on how the algorithm scales with input size, not the actual time</li>
                  <li><strong>Dominant terms:</strong> Only the highest-order term matters (e.g., n² dominates n)</li>
                  <li><strong>Constants are ignored:</strong> O(2n) is simplified to O(n)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Importance</h3>
                <p>
                  Understanding Big-O notation helps developers:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Compare algorithms efficiently</li>
                  <li>Predict performance issues before they occur</li>
                  <li>Make informed decisions about algorithm selection</li>
                  <li>Optimize code where it matters most</li>
                  <li>Communicate about performance in a standardized way</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Big-O vs. Other Notations</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Big-O (O):</strong> Upper bound (worst case)</li>
                  <li><strong>Big-Omega (Ω):</strong> Lower bound (best case)</li>
                  <li><strong>Big-Theta (Θ):</strong> Tight bound (average case)</li>
                </ul>
                <p className="mt-2">
                  In practice, Big-O is the most commonly used notation as we typically want to understand the worst-case performance of our algorithms.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Common Complexities Content */}
        <TabsContent value="common-complexities" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Time Complexities</CardTitle>
              <CardDescription>
                The most frequently encountered complexity classes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-muted-foreground/20">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-2">Notation</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Example</th>
                      <th className="px-4 py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted-foreground/20">
                    <tr>
                      <td className="px-4 py-2">O(1)</td>
                      <td className="px-4 py-2">Constant</td>
                      <td className="px-4 py-2">Array access, hash table lookup</td>
                      <td className="px-4 py-2">Execution time is constant regardless of input size</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">O(log n)</td>
                      <td className="px-4 py-2">Logarithmic</td>
                      <td className="px-4 py-2">Binary search, balanced trees</td>
                      <td className="px-4 py-2">Time increases logarithmically with input size</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">O(n)</td>
                      <td className="px-4 py-2">Linear</td>
                      <td className="px-4 py-2">Linear search, array traversal</td>
                      <td className="px-4 py-2">Time increases linearly with input size</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">O(n log n)</td>
                      <td className="px-4 py-2">Linearithmic</td>
                      <td className="px-4 py-2">Merge sort, heap sort</td>
                      <td className="px-4 py-2">Often the best possible for comparison-based sorting</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">O(n²)</td>
                      <td className="px-4 py-2">Quadratic</td>
                      <td className="px-4 py-2">Bubble sort, insertion sort</td>
                      <td className="px-4 py-2">Time increases quadratically with input size</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">O(n³)</td>
                      <td className="px-4 py-2">Cubic</td>
                      <td className="px-4 py-2">Certain matrix operations</td>
                      <td className="px-4 py-2">Time increases cubically with input size</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">O(2ⁿ)</td>
                      <td className="px-4 py-2">Exponential</td>
                      <td className="px-4 py-2">Fibonacci (naive), power set</td>
                      <td className="px-4 py-2">Time doubles with each addition to input size</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">O(n!)</td>
                      <td className="px-4 py-2">Factorial</td>
                      <td className="px-4 py-2">Traveling salesman (brute force)</td>
                      <td className="px-4 py-2">Grows factorial with input size - extremely slow</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <DiagramBox 
                title="Comparison of Growth Rates"
                diagram={`
Time Complexity Growth (n = input size)
┌───────────────┬───────┬───────┬───────┬───────┬───────┬───────┬───────┐
│ n             │ 10    │ 20    │ 50    │ 100   │ 1000  │ 10000 │ 10⁶   │
├───────────────┼───────┼───────┼───────┼───────┼───────┼───────┼───────┤
│ O(1)          │ 1     │ 1     │ 1     │ 1     │ 1     │ 1     │ 1     │
│ O(log n)      │ 3     │ 4     │ 6     │ 7     │ 10    │ 13    │ 20    │
│ O(n)          │ 10    │ 20    │ 50    │ 100   │ 1000  │ 10⁴   │ 10⁶   │
│ O(n log n)    │ 30    │ 80    │ 300   │ 700   │ 10⁴   │ 10⁵   │ 2×10⁷ │
│ O(n²)         │ 100   │ 400   │ 2500  │ 10⁴   │ 10⁶   │ 10⁸   │ 10¹²  │
│ O(2ⁿ)         │ 10³   │ 10⁶   │ 10¹⁵  │ 10³⁰  │ 10³⁰⁰ │ 10³⁰⁰⁰│ ∞     │
│ O(n!)         │ 10⁶   │ 10¹⁸  │ 10⁶⁴  │ 10¹⁵⁸ │ ∞     │ ∞     │ ∞     │
└───────────────┴───────┴───────┴───────┴───────┴───────┴───────┴───────┘
`}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analysis Content */}
        <TabsContent value="analysis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>How to Analyze Algorithms</CardTitle>
              <CardDescription>
                Techniques for determining the Big-O complexity of code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Basic Rules for Analysis</h3>
                <ol className="list-decimal pl-6 space-y-1">
                  <li><strong>Coefficients are dropped:</strong> O(2n) = O(n)</li>
                  <li><strong>Lower-order terms are dropped:</strong> O(n² + n) = O(n²)</li>
                  <li><strong>Constants are considered O(1):</strong> Any constant-time operation</li>
                  <li><strong>Different variables maintain their identity:</strong> O(n + m) ≠ O(n)</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Analyzing Common Programming Constructs</h3>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Sequential Statements</h4>
                  <p>Simply add the complexities (but remember to simplify by keeping only the highest order)</p>
                  <div className="bg-muted p-3 rounded-md my-2">
                    <pre className="text-xs">
{`// O(1) + O(n) + O(1) = O(n)
int x = 5;           // O(1)
for (i = 0; i < n; i++) { ... }  // O(n)
console.log(x);      // O(1)`}
                    </pre>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Loops</h4>
                  <p>Multiply the complexity of statements inside by the number of iterations</p>
                  <div className="bg-muted p-3 rounded-md my-2">
                    <pre className="text-xs">
{`// O(n) - the loop runs n times
for (i = 0; i < n; i++) {
    console.log(i);  // O(1) operation
}

// O(n²) - nested loops
for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
        console.log(i + j);  // O(1) operation
    }
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Logarithmic Complexity</h4>
                  <p>Often appears when the problem size is reduced by a factor in each step</p>
                  <div className="bg-muted p-3 rounded-md my-2">
                    <pre className="text-xs">
{`// O(log n) - binary search
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Recursion</h4>
                  <p>Analyze using recurrence relations - often results in logarithmic, linear, or exponential complexity</p>
                  <div className="bg-muted p-3 rounded-md my-2">
                    <pre className="text-xs">
{`// O(2ⁿ) - each call creates 2 more calls
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

// O(n) - linear recursion
function sum(arr, n) {
    if (n <= 0) return 0;
    return sum(arr, n-1) + arr[n-1];
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Examples Content */}
        <TabsContent value="examples" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Practical Examples</CardTitle>
              <CardDescription>
                Analyzing real-world algorithm examples
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Example 1: Linear Search vs Binary Search</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Linear Search - O(n)</h4>
                    <div className="bg-muted p-3 rounded-md h-full">
                      <pre className="text-xs">
{`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`}
                      </pre>
                      <p className="mt-2 text-sm">
                        In the worst case, we examine every element once.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Binary Search - O(log n)</h4>
                    <div className="bg-muted p-3 rounded-md h-full">
                      <pre className="text-xs">
{`def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1`}
                      </pre>
                      <p className="mt-2 text-sm">
                        Each iteration eliminates half of the remaining elements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Example 2: Sorting Algorithms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Bubble Sort - O(n²)</h4>
                    <div className="bg-muted p-3 rounded-md h-full">
                      <pre className="text-xs">
{`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`}
                      </pre>
                      <p className="mt-2 text-sm">
                        Two nested loops, each iterating up to n times.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Merge Sort - O(n log n)</h4>
                    <div className="bg-muted p-3 rounded-md h-full">
                      <pre className="text-xs">
{`def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)
    
def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result`}
                      </pre>
                      <p className="mt-2 text-sm">
                        Log n recursive splits, each with n operations to merge.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Example 3: Common Traps</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Hidden Loops - O(n²)</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <pre className="text-xs">
{`def find_pairs(arr):
    pairs = []
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] + arr[j] == 10:
                pairs.append((arr[i], arr[j]))
    return pairs`}
                      </pre>
                      <p className="mt-2 text-sm">
                        Seems simple but has quadratic complexity due to nested loops.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Mistaking Space for Time - O(n) time, O(n) space</h4>
                    <div className="bg-muted p-3 rounded-md">
                      <pre className="text-xs">
{`def contains_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`}
                      </pre>
                      <p className="mt-2 text-sm">
                        O(n) time complexity but also uses O(n) extra space.
                      </p>
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