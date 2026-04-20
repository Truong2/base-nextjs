import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TestService } from "~/services";

const Test = () => {
  const queryClient = useQueryClient();

  // State for queryKey dependency demo
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [userId, setUserId] = useState(1);

  // State for refetch without params demo
  const [shouldFetch, setShouldFetch] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // GET - useGet (useQuery)
  const { data, isLoading, refetch } = TestService.useGet<{
    testResponse: string;
  }>({
    url: "/test",
    params: { foo: "bar" },
    options: {
      enabled: true, // auto fetch
      staleTime: 10000, // data fresh for 10s
    },
  });

  // GET with queryKey dependency - auto refetch when page/limit changes
  const { data: _paginatedData, isLoading: paginatedLoading } =
    TestService.useGet<{
      users: Array<{ id: number; name: string }>;
      total: number;
    }>({
      url: "/users",
      params: { page, limit }, // These variables will be in queryKey
      options: {
        enabled: true,
      },
    });

  // GET with userId dependency - auto refetch when userId changes
  const { data: _userData, isLoading: userLoading } = TestService.useGet<{
    user: { id: number; name: string; email: string };
  }>({
    url: `/users/${userId}`,
    options: {
      enabled: !!userId, // Only fetch when userId exists
    },
  });

  // GET with enabled option - only fetch when shouldFetch = true
  const { data: enabledData, isLoading: enabledLoading } = TestService.useGet<{
    enabledResponse: string;
  }>({
    url: "/enabled-test",
    options: {
      enabled: shouldFetch, // Only fetch when shouldFetch = true
    },
  });

  // GET with trigger - refetch when trigger changes
  const { data: triggerData, isLoading: triggerLoading } = TestService.useGet<{
    triggerResponse: string;
  }>({
    url: "/trigger-test",
    options: {
      enabled: trigger > 0, // Only fetch when trigger > 0
    },
  });

  // GET with refetch function - no auto fetch
  const {
    data: manualData,
    isLoading: manualLoading,
    refetch: manualRefetch,
  } = TestService.useGet<{
    manualResponse: string;
  }>({
    url: "/manual-test",
    options: {
      enabled: false, // No auto fetch
    },
  });

  // POST - usePost (useMutation)
  const {
    mutate: postMutate,
    isPending: postLoading,
    data: postData,
  } = TestService.usePost<{ testResponse: string }>(
    { url: "/test" },
    {
      onSuccess: data => {
        console.log("POST success", data);
      },
    }
  );

  // PUT - usePut (useMutation)
  const { mutate: putMutate, isPending: putLoading } = TestService.usePut<{
    testResponse: string;
  }>({ url: "/test" });

  // PATCH - usePatch (useMutation)
  const { mutate: patchMutate, isPending: patchLoading } =
    TestService.usePatch<{ testResponse: string }>({
      url: "/test",
      params: { id: 1 },
    });

  // DELETE - useDelete (useMutation)
  const { mutate: deleteMutate, isPending: deleteLoading } =
    TestService.useDelete<{ testResponse: string }>({
      url: "/test",
      params: { foo: "bar" },
    });

  // Manual refetch
  const handleRefetch = () => {
    refetch();
  };

  // Invalidate query (force refetch all places using this queryKey)
  const handleInvalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["/test", { foo: "bar" }] });
  };

  // Set data manually
  const handleSetData = () => {
    queryClient.setQueryData(["/test"], { testResponse: "new value" });
  };

  // POST and refetch
  const handlePostAndRefetch = () => {
    postMutate({ data: { foo: "bar" } });
    // After POST success, refetch GET query
    setTimeout(() => {
      refetch();
    }, 1000);
  };

  // Trigger enabled query
  const handleEnableFetch = () => {
    setShouldFetch(true);
  };

  // Trigger refetch with trigger state
  const handleTriggerRefetch = () => {
    setTrigger(prev => prev + 1);
  };

  // Manual refetch
  const handleManualRefetch = () => {
    manualRefetch();
  };

  // Refetch specific query
  const handleRefetchSpecific = () => {
    queryClient.refetchQueries({ queryKey: ["/users"] });
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Test API Service</h2>

      {/* QueryKey Dependency Demo */}
      <div className="rounded border p-4">
        <h3 className="mb-2 font-semibold">QueryKey Dependency Demo</h3>

        {/* Pagination Controls */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Page:</span>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="rounded bg-gray-500 px-2 py-1 text-white hover:bg-gray-600"
            >
              -
            </button>
            <span className="w-8 text-center">{page}</span>
            <button
              onClick={() => setPage(p => p + 1)}
              className="rounded bg-gray-500 px-2 py-1 text-white hover:bg-gray-600"
            >
              +
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Limit:</span>
            <select
              value={limit}
              onChange={e => setLimit(Number(e.target.value))}
              className="rounded border px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">User ID:</span>
            <button
              onClick={() => setUserId(u => Math.max(1, u - 1))}
              className="rounded bg-gray-500 px-2 py-1 text-white hover:bg-gray-600"
            >
              -
            </button>
            <span className="w-8 text-center">{userId}</span>
            <button
              onClick={() => setUserId(u => u + 1)}
              className="rounded bg-gray-500 px-2 py-1 text-white hover:bg-gray-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Query Results */}
        <div className="space-y-2">
          <div>
            <span className="font-medium">Paginated Data: </span>
            {paginatedLoading ? "Loading..." : `Page ${page}, Limit ${limit}`}
          </div>
          <div>
            <span className="font-medium">User Data: </span>
            {userLoading ? "Loading..." : `User ID: ${userId}`}
          </div>
        </div>
      </div>

      {/* Refetch Without Params Demo */}
      <div className="rounded border p-4">
        <h3 className="mb-2 font-semibold">Refetch Without Params Demo</h3>

        <div className="space-y-4">
          {/* Enabled Option */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium">1. Enabled Option</h4>
            <div className="mb-2">
              <span className="text-sm">Status: </span>
              {shouldFetch ? "Enabled" : "Disabled"}
            </div>
            <button
              onClick={handleEnableFetch}
              className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            >
              Enable Fetch
            </button>
            <div className="mt-2 text-sm text-gray-600">
              Data:{" "}
              {enabledLoading
                ? "Loading..."
                : enabledData?.enabledResponse || "No data"}
            </div>
          </div>

          {/* Trigger State */}
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-medium">2. Trigger State</h4>
            <div className="mb-2">
              <span className="text-sm">Trigger count: </span>
              {trigger}
            </div>
            <button
              onClick={handleTriggerRefetch}
              className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
            >
              Trigger Refetch
            </button>
            <div className="mt-2 text-sm text-gray-600">
              Data:{" "}
              {triggerLoading
                ? "Loading..."
                : triggerData?.triggerResponse || "No data"}
            </div>
          </div>

          {/* Manual Refetch */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-medium">3. Manual Refetch</h4>
            <button
              onClick={handleManualRefetch}
              className="rounded bg-purple-500 px-3 py-1 text-white hover:bg-purple-600"
            >
              Manual Refetch
            </button>
            <div className="mt-2 text-sm text-gray-600">
              Data:{" "}
              {manualLoading
                ? "Loading..."
                : manualData?.manualResponse || "No data"}
            </div>
          </div>

          {/* QueryClient Refetch */}
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-medium">4. QueryClient Refetch</h4>
            <button
              onClick={handleRefetchSpecific}
              className="rounded bg-orange-500 px-3 py-1 text-white hover:bg-orange-600"
            >
              Refetch /users Query
            </button>
            <div className="mt-2 text-sm text-gray-600">
              Refetches all queries with key ["/users"]
            </div>
          </div>
        </div>
      </div>

      {/* GET Section */}
      <div className="rounded border p-4">
        <h3 className="mb-2 font-semibold">GET Request</h3>
        <div className="mb-2">
          <span className="font-medium">Data: </span>
          {isLoading ? "Loading..." : data?.testResponse || "No data"}
        </div>
        <div className="space-x-2">
          <button
            onClick={handleRefetch}
            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          >
            Refetch
          </button>
          <button
            onClick={handleInvalidate}
            className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
          >
            Invalidate
          </button>
          <button
            onClick={handleSetData}
            className="rounded bg-purple-500 px-3 py-1 text-white hover:bg-purple-600"
          >
            Set Data
          </button>
        </div>
      </div>

      {/* POST Section */}
      <div className="rounded border p-4">
        <h3 className="mb-2 font-semibold">POST Request</h3>
        <div className="mb-2">
          <span className="font-medium">Response: </span>
          {postLoading ? "Loading..." : postData?.testResponse || "No response"}
        </div>
        <div className="space-x-2">
          <button
            onClick={() => postMutate({ data: { foo: "bar" } })}
            disabled={postLoading}
            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            Post Data
          </button>
          <button
            onClick={handlePostAndRefetch}
            disabled={postLoading}
            className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600 disabled:opacity-50"
          >
            Post & Refetch
          </button>
        </div>
      </div>

      {/* PUT Section */}
      <div className="rounded border p-4">
        <h3 className="mb-2 font-semibold">PUT Request</h3>
        <button
          onClick={() => putMutate({ data: { foo: "put" } })}
          disabled={putLoading}
          className="rounded bg-orange-500 px-3 py-1 text-white hover:bg-orange-600 disabled:opacity-50"
        >
          Put Data
        </button>
      </div>

      {/* PATCH Section */}
      <div className="rounded border p-4">
        <h3 className="mb-2 font-semibold">PATCH Request</h3>
        <button
          onClick={() => patchMutate({ data: { foo: "patch" } })}
          disabled={patchLoading}
          className="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600 disabled:opacity-50"
        >
          Patch Data
        </button>
      </div>

      {/* DELETE Section */}
      <div className="rounded border p-4">
        <h3 className="mb-2 font-semibold">DELETE Request</h3>
        <div className="space-x-2">
          <button
            onClick={() => deleteMutate(123)}
            disabled={deleteLoading}
            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 disabled:opacity-50"
          >
            Delete by ID
          </button>
          <button
            onClick={() => deleteMutate({ foo: "bar" })}
            disabled={deleteLoading}
            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50"
          >
            Delete by Params
          </button>
        </div>
      </div>

      {/* QueryClient Actions */}
      <div className="rounded border p-4">
        <h3 className="mb-2 font-semibold">QueryClient Actions</h3>
        <div className="space-x-2">
          <button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["/test"] })
            }
            className="rounded bg-indigo-500 px-3 py-1 text-white hover:bg-indigo-600"
          >
            Invalidate All /test
          </button>
          <button
            onClick={() => queryClient.removeQueries({ queryKey: ["/test"] })}
            className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
          >
            Remove /test Cache
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;
